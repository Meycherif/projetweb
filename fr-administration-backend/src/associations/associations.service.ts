import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AssociationsService {
  constructor(
    @InjectRepository(Association)
    private repository: Repository<Association>,
    private usersService: UsersService,
  ) {}

  async getAll(): Promise<Association[]> {
    return await this.repository.find();
  }

  async getFirst(): Promise<Association> {
    const associations = await this.repository.find();
    if (associations.length === 0) {
      throw new HttpException('No associations found', HttpStatus.NOT_FOUND);
    }
    return associations[0];
  }

  async create(idUsers: number[], name: string): Promise<Association> {
    if (!idUsers || !name) {
      throw new HttpException(
        "All fields 'idUsers' and 'name' must be provided",
        HttpStatus.BAD_REQUEST,
      );
    }

    const users = await this.usersService.getByIds(idUsers);
    const newAssociation = this.repository.create({ users, name });
    return await this.repository.save(newAssociation);
  }

  async update(id: number, idUsers: number[], name: string): Promise<Association> {
    const association = await this.repository.findOne({ where: { id } });
    if (!association) {
      throw new HttpException(`Association with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (idUsers) {
      association.users = await this.usersService.getByIds(idUsers);
    }
    if (name) {
      association.name = name;
    }

    return await this.repository.save(association);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Association with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }

  async deleteAll(): Promise<void> {
    await this.repository.clear();
  }

  async getById(id: number): Promise<Association> {
    const association = await this.repository.findOne({ where: { id }, relations: ['users'] });
    if (!association) {
      throw new HttpException(`Association with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return association;
  }

  async getMembers(id: number): Promise<User[]> {
    const association = await this.getById(id);
    return association.users;
  }

  async findOne(id: number): Promise<Association> {
    const association = await this.repository.findOne({ where: { id }, relations: ['users'] });
    if (!association) {
      throw new HttpException(`Association with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return association;
  }
}
