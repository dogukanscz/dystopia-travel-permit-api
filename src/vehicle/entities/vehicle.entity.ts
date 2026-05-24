import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VehicleType {
  CAR = 'CAR',
  TRUCK = 'TRUCK',
  VAN = 'VAN',
  BUS = 'BUS',
  MOTORCYCLE = 'MOTORCYCLE',
}

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'vehicle_type', type: 'enum', enum: VehicleType })
  vehicleType: VehicleType;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @Column({ name: 'model_year' })
  modelYear: number;

  @Column({ length: 20, unique: true })
  plate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
