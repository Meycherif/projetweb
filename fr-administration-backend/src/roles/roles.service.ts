import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { UsersService } from '../users/users.service';
import { AssociationsService } from '../associations/associations.service';
import { User } from '../users/user.entity'; // 🔁 Chemin corrigé ici

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AssociationsService))
    private readonly associationsService: AssociationsService,
  ) {}

  async create({ idAssociation, idUser, name }: CreateRoleDto): Promise<Role> {
    const [user, association] = await Promise.all([
      this.usersService.findOne(idUser),
      this.associationsService.findOne(idAssociation),
    ]);
    if (!user || !association) {
      throw new NotFoundException('user or association not found');
    }

    const role = new Role();
    role.name = name;
    role.user = user;
    role.association = association;
    return this.repository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.repository.find();
  }

  async findManyByAssociation(association: number): Promise<Role[]> {
    return this.repository.find({
      where: { associationId: association },
      relations: { association: true, user: true },
    });
  }

  async findOne(user: number, association: number): Promise<Role> {
    const result = await this.repository.findOne({
      where: { userId: user, associationId: association },
    });
    if (result === null) {
      throw new NotFoundException('Role not found');
    }
    return result;
  }

  async update(
    user: number,
    association: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    const role: Role = await this.findOne(user, association);
    role.name = updateRoleDto.name;
    return this.repository.save(role);
  }

  async remove(user: number, association: number): Promise<Role> {
    const role: Role = await this.findOne(user, association);
    return this.repository.remove(role);
  }

  async getRolesForUser(user: number): Promise<Role[]> {
    return this.repository.find({ where: { userId: user } });
  }

  async getUsersByRoleName(name: string): Promise<User[]> {
    const roles = await this.repository.find({
      where: { name },
      relations: {
        user: true,
      },
    });
    return roles.map((role) => role.user);
  }

  async deleteMany(roles: Role[]): Promise<Role[]> {
    return this.repository.remove(roles);
  }
}
