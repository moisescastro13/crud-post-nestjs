import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, PostModule],
})
export class AppModule {}
