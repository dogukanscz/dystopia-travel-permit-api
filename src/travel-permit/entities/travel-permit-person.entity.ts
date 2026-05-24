import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { TravelPermit } from './travel-permit.entity';
import { Person } from '../../person/entities/person.entity';

export enum PermitPersonRole {
  OWNER = 'OWNER',
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
  EMPLOYEE = 'EMPLOYEE',
}

@Entity('travel_permit_persons')
export class TravelPermitPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TravelPermit, travelPermit => travelPermit.permittedPersons, {
    onDelete: 'CASCADE',
  })
  travelPermit: TravelPermit;

  @ManyToOne(() => Person, { nullable: false })
  person: Person;

  @Column({ type: 'enum', enum: PermitPersonRole })
  role: PermitPersonRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
