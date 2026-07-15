import 'dotenv/config';
import { join } from 'node:path';
import { DataSource } from 'typeorm';

import { Cargo } from '../cargo/entities/cargo.entity';
import { Location } from '../location/entities/location.entity';
import { Person } from '../person/entities/person.entity';
import { ShippingContainer } from '../shipping-container/entities/shipping-container.entity';
import { Trailer } from '../trailer/entities/trailer.entity';
import { TravelPermitCargo } from '../travel-permit/entities/travel-permit-cargo.entity';
import { TravelPermitPerson } from '../travel-permit/entities/travel-permit-person.entity';
import { TravelPermit } from '../travel-permit/entities/travel-permit.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [
    Cargo,
    Location,
    Person,
    ShippingContainer,
    Trailer,
    TravelPermitCargo,
    TravelPermitPerson,
    TravelPermit,
    Vehicle,
  ],

  migrations: [join(__dirname, 'migrations', '*.{js,ts}')],

  synchronize: false,
});
