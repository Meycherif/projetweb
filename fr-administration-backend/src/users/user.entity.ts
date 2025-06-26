import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  constructor(
    id: number,
    lastname: string,
    firstname: string,
    age: number,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

export class UserInput {
  @ApiProperty({
    description: 'The firstname of the user',
    example: 'John',
    type: String,
  })
  public firstname: string;

  @ApiProperty({
    description: 'The lastname of the user',
    example: 'Doe',
    type: String,
  })
  public lastname: string;

  @ApiProperty({
    description: 'The age of the user',
    minimum: 18,
    default: 18,
    type: Number,
  })
  public age: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    type: String,
  })
  public email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123456',
    type: String,
  })
  public password: string;
}
