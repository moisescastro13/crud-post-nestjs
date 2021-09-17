import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly _postRepository: PostRepository,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const newPost = await this._postRepository.save({
      name: createPostDto.name,
      content: createPostDto.content,
    });
    return newPost;
  }

  async findAll(): Promise<PostEntity[]> {
    return await this._postRepository.find({ where: { Status: 'ACTIVE' } });
  }

  async findOne(id: number): Promise<PostEntity> {
    const postExist = await this._postRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });
    if (!postExist) throw new NotFoundException('Este post no existe');
    return postExist;
  }

  async update(id: number, updatePostDto: Partial<UpdatePostDto>) {
    const postExist = await this._postRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });
    if (!postExist) throw new NotFoundException('Este post no existe');
    const updatedPost = Object.assign(postExist, updatePostDto);

    return await this._postRepository.save(updatedPost);
  }

  async remove(id: number): Promise<void> {
    const postExist = await this._postRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });
    if (!postExist) throw new NotFoundException('Este post no existe');

    await this._postRepository.update(id, { Status: 'INACTIVE' });
  }
}
