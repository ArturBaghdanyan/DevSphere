import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CommentsCreateDto {
  @ApiProperty({})
  @IsNumber()
  commentId: number;

  @IsString() text: string;
}
