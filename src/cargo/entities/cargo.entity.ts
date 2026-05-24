import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CargoUnit {
  PIECE = 'PIECE',
  BOX = 'BOX',
  KG = 'KG',
  TON = 'TON',
  LITER = 'LITER',
  PALLET = 'PALLET',
}

@Entity('cargoes')
export class Cargo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'content_name', length: 150 })
  contentName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'enum', enum: CargoUnit })
  unit: CargoUnit;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
