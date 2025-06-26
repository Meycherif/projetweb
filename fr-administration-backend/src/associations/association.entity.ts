import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  
  @Column()
  name: string;

  constructor(id: number, users: User[], name: string) {
    this.id = id;
    this.users = users;
    this.name = name;
  }
}


export class AssociationInput {
  @ApiProperty({
    description: 'The IDs of the users associated with the association',
    example: [1, 2],
    type: [Number],
  })
  public idUsers: number[];

  @ApiProperty({
    description: 'The name of the association',
    example: 'Assoc1',
    type: String,
  })
  public name: string;
}