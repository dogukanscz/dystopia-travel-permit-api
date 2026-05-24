import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Trailer } from '../../trailer/entities/trailer.entity';
import { ShippingContainer } from '../../shipping-container/entities/shipping-container.entity';
import { Location } from '../../location/entities/location.entity';
import { TravelPermitPerson } from './travel-permit-person.entity';
import { TravelPermitCargo } from './travel-permit-cargo.entity';

export enum TravelPermitStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

@Entity('travel_permits')
export class TravelPermit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'permit_number', unique: true })
  permitNumber: string;

  @ManyToOne(() => Person, { nullable: false })
  owner: Person;

  @ManyToOne(() => Location, { nullable: false })
  startLocation: Location;

  @ManyToOne(() => Location, { nullable: false })
  endLocation: Location;

  @ManyToOne(() => Vehicle, { nullable: false })
  vehicle: Vehicle;

  @ManyToOne(() => Trailer, { nullable: true })
  trailer?: Trailer | null;

  @ManyToOne(() => ShippingContainer, { nullable: true })
  container?: ShippingContainer | null;

  @OneToMany(() => TravelPermitPerson, permitPerson => permitPerson.travelPermit)
  permittedPersons: TravelPermitPerson[];

  @OneToMany(() => TravelPermitCargo, permitCargo => permitCargo.travelPermit)
  cargoes: TravelPermitCargo[];

  @Column({ name: 'qr_code', type: 'text', nullable: true })
  qrCode?: string;

  @Column({ name: 'starts_at', type: 'timestamp' })
  startsAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt: Date;

  @Column({
    type: 'enum',
    enum: TravelPermitStatus,
    default: TravelPermitStatus.ACTIVE,
  })
  status: TravelPermitStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setDefaultDates() {
    const now = new Date();

    if (!this.startsAt) {
      this.startsAt = now;
    }

    if (!this.expiresAt) {
      const expiresAt = new Date(now);
      expiresAt.setDate(expiresAt.getDate() + 30);
      this.expiresAt = expiresAt;
    }
  }
}
