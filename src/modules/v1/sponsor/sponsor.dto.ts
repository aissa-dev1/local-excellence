import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateSponsorV1Dto {
  @Length(2, 25, { message: 'background-color must be 2-25 characters long' })
  backgroundColor: string;

  @Length(2, 25, { message: 'Color must be 2-25 characters long' })
  color: string;

  @MinLength(2, { message: 'Description must be at least 2 characters long' })
  description: string;

  @IsString({ message: 'Href must be a string' })
  @IsNotEmpty({ message: 'Href is required' })
  href: string;

  @IsString({ message: 'Button text must be a string' })
  @IsNotEmpty({ message: 'Button text is required' })
  btnText: string;

  @IsBoolean({ message: 'Dynamic link must be a boolean' })
  dynamicLink: boolean;
}
