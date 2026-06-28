import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateLikesDto {
  @ApiProperty({})
  @IsNumber()
  postId: number;
}
