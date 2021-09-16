import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ssl: false,
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      synchronize: true,
      entities: [__dirname + '../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + './migrations/*{.ts,.js}'],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
