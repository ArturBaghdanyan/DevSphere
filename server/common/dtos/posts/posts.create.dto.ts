import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../../enums/post-type';
import { CommentsCreateDto } from '../comments/comments.create.dto';

export class CreatePostsDto {
  @IsEnum(PostType) content_type: PostType;
  @IsString() title: string;
  @IsString() description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentsCreateDto)
  comments?: CommentsCreateDto[];
}
