import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity'; // Import Association entity
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Association]), // Add Association entity to TypeOrmModule
    UsersModule, // Add UsersModule to imports
  ],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}