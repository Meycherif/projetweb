import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association, AssociationInput} from './association.entity';
import { User } from '../users/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Associations')
@Controller('associations')
export class AssociationsController {
  constructor(private service: AssociationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all associations' })
  @ApiResponse({ status: 200, description: 'Return all associations', type: [Association] })
  async getAll(): Promise<Association[]> {
    return await this.service.getAll();
  }

  @Get('first')
  @ApiOperation({ summary: 'Get the first association' })
  @ApiResponse({ status: 200, description: 'Return the first association', type: Association })
  @ApiResponse({ status: 404, description: 'No associations found' })
  async getFirst(): Promise<Association> {
    return await this.service.getFirst();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new association' })
  @ApiBody({ type: AssociationInput })
  @ApiResponse({ status: 201, description: 'The association has been successfully created.', type: Association })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() input: AssociationInput): Promise<Association> {
    return await this.service.create(input.idUsers, input.name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing association' })
  @ApiParam({ name: 'id', description: 'The ID of the association to update' })
  @ApiBody({ type: AssociationInput })
  @ApiResponse({ status: 200, description: 'The association has been successfully updated.', type: Association })
  @ApiResponse({ status: 404, description: 'Association not found' })
  async update(
    @Param('id') id: number,
    @Body() input: AssociationInput
  ): Promise<Association> {
    return await this.service.update(id, input.idUsers, input.name);
  }

  @Delete('all')
  @ApiOperation({ summary: 'Delete all associations' })
  @ApiResponse({ status: 200, description: 'All associations have been deleted' })
  async deleteAll(): Promise<string> {
    await this.service.deleteAll();
    return 'All associations have been deleted';
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an association by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the association to delete' })
  @ApiResponse({ status: 200, description: 'The association has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Association not found' })
  async delete(@Param('id') id: number): Promise<string> {
    await this.service.delete(id);
    return `Association with id ${id} has been deleted`;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an association by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the association to retrieve' })
  @ApiResponse({ status: 200, description: 'Return the association', type: Association })
  @ApiResponse({ status: 404, description: 'Association not found' })
  async getById(@Param('id') id: number): Promise<Association> {
    return await this.service.getById(id);
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Get members of an association by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the association to retrieve members for' })
  @ApiResponse({ status: 200, description: 'Return the members of the association', type: [User] })
  @ApiResponse({ status: 404, description: 'Association not found' })
  async getMembers(@Param('id') id: number): Promise<User[]> {
    return await this.service.getMembers(id);
  }
}