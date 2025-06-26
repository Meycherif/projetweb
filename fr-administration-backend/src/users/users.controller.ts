import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserInput } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @Get('first')
  @ApiOperation({ summary: 'Get the first user' })
  @ApiResponse({ status: 200, description: 'Return the first user', type: User })
  @ApiResponse({ status: 404, description: 'No users found' })
  async getFirst(): Promise<User> {
    return await this.service.getFirst();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserInput })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() input: UserInput): Promise<User> {
    return await this.service.create(input.lastname, input.firstname, input.age);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiBody({ type: UserInput })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: number,
    @Body() input: UserInput
  ): Promise<User> {
    return await this.service.update(id, input.lastname, input.firstname, input.age);
  }

  @Delete('all')
  @ApiOperation({ summary: 'Delete all users' })
  @ApiResponse({ status: 200, description: 'All users have been deleted' })
  async deleteAll(): Promise<string> {
    await this.service.deleteAll();
    return 'All users have been deleted';
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to delete' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: number): Promise<string> {
    await this.service.delete(id);
    return `User with id ${id} has been deleted`;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
  @ApiResponse({ status: 200, description: 'Return the user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getById(@Param('id') id: number): Promise<User> {
    return await this.service.getById(id);
  }
}