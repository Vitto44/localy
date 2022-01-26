import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  telephone: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  latitude: number;

  @Column({ nullable: false })
  longitude: number;

  @Column('text', { array: true, nullable: true, default: [] })
  products: string[];

  @Column('text', { array: true, nullable: true, default: [] })
  pictures: string[];

  @ManyToOne(() => User, (user) => user.shopsIds)
  ownerId: string;
}
