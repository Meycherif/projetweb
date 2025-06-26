import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Association } from '../../associations/association.entity';



import { User } from '../../users/user.entity';

@Entity()
export class Minute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => Association, { eager: true })
  association: Association;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  voters: User[];
}
