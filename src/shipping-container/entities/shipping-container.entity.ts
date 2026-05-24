import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shipping_containers')
export class ShippingContainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'container_number', length: 50, unique: true })
  containerNumber: string;

  @Column({ length: 100, nullable: true })
  type?: string;

  @Column({
    name: 'max_capacity_kg',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  maxCapacityKg?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
