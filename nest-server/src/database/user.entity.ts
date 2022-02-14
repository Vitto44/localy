import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Shop, (shop) => shop.ownerId)
  shopsIds: Shop[];
}
