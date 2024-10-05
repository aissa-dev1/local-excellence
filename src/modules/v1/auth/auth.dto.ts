import { IsEmail, MinLength } from 'class-validator';
import { CreateUserV1Dto } from '../user/user.dto';

export class AuthV1SignUpDto extends CreateUserV1Dto {}

export class AuthV1LoginDto {
  @IsEmail({}, { message: 'Provide a valid Email please' })
  email: string;

  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;
}
