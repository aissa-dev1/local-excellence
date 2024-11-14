import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserServiceV1 } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  AuthV1LoginDto,
  AuthV1SignUpDto,
  IAuthV1LoginDto,
  IAuthV1SignUpDto,
} from './auth.dto';
import { AuthV1LoginResponse } from './auth.types';
import { authV1Translation } from './auth.translation';
import { TranslationManager } from 'src/utils/translation-manager';
import { validateDto } from 'src/utils/validate-dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TranslationLanguage } from 'src/types/translation';

@Controller({ path: 'auth', version: '1' })
export class AuthControllerV1 {
  private readonly translation = new TranslationManager({
    translation: authV1Translation,
    language: 'en',
  });

  constructor(
    private readonly userService: UserServiceV1,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: IAuthV1SignUpDto): Promise<string> {
    const dto = new AuthV1SignUpDto(body);

    await validateDto(dto);

    this.translation.setLanguage(dto.language);
    const user = await this.userService.findOne({
      filter: { email: dto.email },
    });

    if (user) {
      throw new UnauthorizedException(this.translation.errors['email-exists']);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const createdUser = await this.userService.createUser({
      ...dto,
      email: dto.email.toLowerCase(),
      password: hashedPassword,
    });
    return `${this.translation.messages['thanks-for-joining']} ${createdUser.userName}`;
  }

  @Post('login')
  async login(@Body() body: IAuthV1LoginDto): Promise<AuthV1LoginResponse> {
    const dto = new AuthV1LoginDto(body);

    await validateDto(dto);

    this.translation.setLanguage(dto.language);

    const user = await this.userService.findOne({
      filter: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException(
        this.translation.errors['invalid-credentials'],
      );
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException(
        this.translation.errors['invalid-credentials'],
      );
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user._id,
      email: user.email,
      userName: user.userName,
      joinedAt: user.joinedAt,
    });
    return {
      message: `${this.translation.messages.welcome} ${user.userName}`,
      accessToken,
    };
  }

  @Post('sign-out')
  @UseGuards(JwtAuthGuard)
  async signOut(
    @Param('language') language: TranslationLanguage,
  ): Promise<string> {
    this.translation.setLanguage(language);
    return this.translation.messages['signed-out'];
  }
}
