import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trailers')
export class Trailer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  plate: string;

  @Column({ length: 100, nullable: true })
  brand?: string;

  @Column({ length: 100, nullable: true })
  model?: string;

  @Column({ name: 'production_year', nullable: true })
  productionYear?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
