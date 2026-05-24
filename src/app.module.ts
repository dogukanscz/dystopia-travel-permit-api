import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { LocationModule } from './location/location.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TrailerModule } from './trailer/trailer.module';
import { ShippingContainerModule } from './shipping-container/shipping-container.module';
import { CargoModule } from './cargo/cargo.module';
import { TravelPermitModule } from './travel-permit/travel-permit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    PersonModule,

    LocationModule,

    VehicleModule,

    TrailerModule,

    ShippingContainerModule,

    CargoModule,

    TravelPermitModule,
  ],
})
export class AppModule {}
