import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../common/models/entities/Post.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePostsDto } from '../../common/dtos/posts/posts.create.dto';
import { Comments } from '../../common/models/entities/Comments.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostsDto, userId: string) {
    return await this.postRepository.manager.transaction(async (manager) => {
      const newPost = manager.create(Post, {
        content_type: createPostDto.content_type,
        title: createPostDto.title,
        description: createPostDto.description,
        userId,
      });
      const savedPost = await manager.save(newPost);

      if (createPostDto.comments?.length) {
        const comments = createPostDto.comments.map((c) =>
          manager.create(Comments, {
            ...c,
            postId: savedPost.postId,
            userId,
          }),
        );
        await manager.save(comments);
      }

      return savedPost;
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoin('like.user', 'user')
      .addSelect(['user.id', 'user.username', 'user.email'])
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.saves', 'saves')
      .where('post.postId = :id', { id })
      .getOne();

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(post: Partial<Post>) {
    return await this.postRepository.save(post);
  }

  async remove(id: number, userId: string) {
    const post = await this.postRepository.findOne({ where: { postId: id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    if (post.userId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }
    return await this.postRepository.delete(id);
  }
}
