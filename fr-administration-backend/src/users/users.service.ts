import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async getFirst(): Promise<User> {
    const users = await this.repository.find();
    if (users.length === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
    return users[0];
  }

  async create(lastname: string, firstname: string, age: number): Promise<User> {
    if (!lastname || !firstname || !age) {
      throw new HttpException(
        "All fields 'lastname', 'firstname' and 'age' must be provided",
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = this.repository.create({ lastname, firstname, age });
    return await this.repository.save(newUser);
  }

  async update(id: number, lastname: string, firstname: string, age: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    user.lastname = lastname;
    user.firstname = firstname;
    user.age = age;

    return await this.repository.save(user);
  }

  async deleteAll(): Promise<void> {
    await this.repository.clear();
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getByIds(ids: number[]): Promise<User[]> {
    const users = await this.repository.findByIds(ids);
    if (users.length !== ids.length) {
      throw new HttpException(`Some users not found`, HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async findOneByEmail(email: string, includePassword = false): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { firstname: email } }); // TEMPORAIRE
    if (!user) return undefined;

    if (!includePassword) {
      delete (user as any).password;
    }

    return user;
  }


  async findOne(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findManyById(ids: number[]): Promise<User[]> {
    const users = await this.repository.findByIds(ids);
    if (users.length !== ids.length) {
      throw new HttpException('Some users not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }
}
