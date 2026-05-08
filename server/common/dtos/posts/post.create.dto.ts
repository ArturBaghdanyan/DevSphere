import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostType } from '../../enums/post-type';

export class CreatePostDto {
  @ApiProperty({})
  @IsNumber()
  userId: number;

  @ApiProperty({
    enum: PostType,
    description: 'Type of content: post or question',
  })
  @IsEnum(PostType)
  content_type: PostType;

  @ApiProperty({
    example: 'How to learn NestJS?',
    description: 'Title of the post',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the post',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2023-10-27T10:00:00Z',
    description: 'ISO Date string',
  })
  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
