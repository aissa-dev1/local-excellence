import { IsEmail, MinLength } from 'class-validator';
import { CreateUserV1Dto, ICreateUserV1Dto } from '../user/user.dto';
import { IsLanguage } from 'src/decorators/is-language.decorator';
import { TranslationLanguage } from 'src/types/translation';
import { TranslationManager } from 'src/utils/translation-manager';
import { authV1Translation } from './auth.translation';

export interface IAuthV1SignUpDto extends ICreateUserV1Dto {
  language: TranslationLanguage;
}

export class AuthV1SignUpDto
  extends CreateUserV1Dto
  implements IAuthV1SignUpDto
{
  constructor(dto: IAuthV1SignUpDto) {
    super({
      email: dto.email,
      password: dto.password,
      userName: dto.userName,
    });
    this.language = dto.language;
    AuthV1SignUpDto.translation.setLanguage(this.language);
  }

  @IsLanguage()
  language: TranslationLanguage;
}

export interface IAuthV1LoginDto {
  email: string;
  password: string;
  language: TranslationLanguage;
}

export class AuthV1LoginDto implements IAuthV1LoginDto {
  static readonly translation = new TranslationManager({
    translation: authV1Translation,
    language: 'ar',
  });

  constructor(dto: IAuthV1LoginDto) {
    this.email = dto.email;
    this.password = dto.password;
    this.language = dto.language;
    AuthV1LoginDto.translation.setLanguage(this.language);
  }

  @IsEmail(
    {},
    {
      message: () => AuthV1LoginDto.translation.dtos['email'],
    },
  )
  email: string;

  @MinLength(4, {
    message: () => AuthV1LoginDto.translation.dtos['password'],
  })
  password: string;

  @IsLanguage()
  language: TranslationLanguage;
}
