import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPermitService } from './travel-permit.service';
import { TravelPermitController } from './travel-permit.controller';
import { TravelPermit } from './entities/travel-permit.entity';
import { TravelPermitPerson } from './entities/travel-permit-person.entity';
import { TravelPermitCargo } from './entities/travel-permit-cargo.entity';
import { Person } from '../person/entities/person.entity';
import { Location } from '../location/entities/location.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Trailer } from '../trailer/entities/trailer.entity';
import { ShippingContainer } from '../shipping-container/entities/shipping-container.entity';
import { Cargo } from '../cargo/entities/cargo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TravelPermit,
      TravelPermitPerson,
      TravelPermitCargo,
      Person,
      Location,
      Vehicle,
      Trailer,
      ShippingContainer,
      Cargo,
    ]),
  ],
  controllers: [TravelPermitController],
  providers: [TravelPermitService],
})
export class TravelPermitModule {}
