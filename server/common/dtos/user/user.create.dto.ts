import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'janedoe123' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsStrongPassword()
  password: string;
}
