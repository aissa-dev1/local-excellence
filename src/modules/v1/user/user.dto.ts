import { IsEmail, Length, MinLength } from 'class-validator';
import { TranslationManager } from 'src/utils/translation-manager';
import { userV1Translation } from './user.translation';

export interface ICreateUserV1Dto {
  email: string;
  password: string;
  userName: string;
}

export class CreateUserV1Dto implements ICreateUserV1Dto {
  static readonly translation = new TranslationManager({
    translation: userV1Translation,
    language: 'en',
  });

  constructor(dto: ICreateUserV1Dto) {
    this.email = dto.email;
    this.password = dto.password;
    this.userName = dto.userName;
  }

  @IsEmail({}, { message: () => CreateUserV1Dto.translation.dtos['email'] })
  email: string;

  @MinLength(4, {
    message: () => CreateUserV1Dto.translation.dtos['password'],
  })
  password: string;

  @Length(2, 25, {
    message: () => CreateUserV1Dto.translation.dtos['user-name'],
  })
  userName: string;
}
