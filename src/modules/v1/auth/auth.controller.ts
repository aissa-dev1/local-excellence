import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserServiceV1 } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthV1LoginDto, AuthV1SignUpDto } from './auth.dto';
import { AuthV1LoginResponse } from './auth.types';

@Controller({ path: 'auth', version: '1' })
export class AuthControllerV1 {
  constructor(
    private readonly userService: UserServiceV1,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/sign-up')
  async signUp(@Body() dto: AuthV1SignUpDto): Promise<string> {
    const user = await this.userService.findOne({
      filter: { email: dto.email },
    });

    if (user) {
      throw new UnauthorizedException(
        'This email is already linked with another account',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const createdUser = await this.userService.createUser({
      ...dto,
      email: dto.email.toLowerCase(),
      password: hashedPassword,
    });
    return `Thanks for joining ${createdUser.userName}`;
  }

  @Post('/login')
  async login(@Body() dto: AuthV1LoginDto): Promise<AuthV1LoginResponse> {
    const user = await this.userService.findOne({
      filter: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user._id,
      email: user.email,
      userName: user.userName,
    });
    return { message: `Welcome ${user.userName}`, accessToken };
  }
}
