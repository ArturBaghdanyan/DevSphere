import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from '../../enums/post-type';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from './Comments.entity';
import { Save } from './Save.entity';
import { Like } from './Like.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ type: 'uuid', name: 'userId', nullable: false })
  userId: string;

  @ApiProperty({
    enum: PostType,
    description: 'Type of content: post or question',
  })
  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.POST,
  })
  content_type: PostType;

  @ApiProperty({ example: 'My Post Title', description: 'Post title' })
  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;

  @ApiProperty({
    example: 'This is the post description',
    description: 'Post description',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'ISO Date string' })
  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Save, (save) => save.post)
  saves: Save[];
}
