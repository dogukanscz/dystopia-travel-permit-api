import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { TravelPermit } from './travel-permit.entity';
import { Cargo } from '../../cargo/entities/cargo.entity';

export enum CargoPlacement {
  VEHICLE = 'VEHICLE',
  TRAILER = 'TRAILER',
  CONTAINER = 'CONTAINER',
}

@Entity('travel_permit_cargoes')
export class TravelPermitCargo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TravelPermit, travelPermit => travelPermit.cargoes, {
    onDelete: 'CASCADE',
  })
  travelPermit: TravelPermit;

  @ManyToOne(() => Cargo, { nullable: false })
  cargo: Cargo;

  @Column({
    name: 'placement',
    type: 'enum',
    enum: CargoPlacement,
  })
  placement: CargoPlacement;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
