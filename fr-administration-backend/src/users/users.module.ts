import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import the User entity
  controllers: [UsersController],
  providers: [UsersService],

  exports: [UsersService], // Export UsersService to be used in other modules (associations.module.ts)
})
export class UsersModule {}
