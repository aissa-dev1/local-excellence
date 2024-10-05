import { IsEmail, Length, MinLength } from 'class-validator';

export class CreateUserV1Dto {
  @IsEmail({}, { message: 'Provide a valid Email please' })
  email: string;

  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;

  @Length(2, 25, { message: 'userName must be 2-25 characters long' })
  userName: string;
}
