import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingContainerService } from './shipping-container.service';
import { ShippingContainerController } from './shipping-container.controller';
import { ShippingContainer } from './entities/shipping-container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingContainer])],
  controllers: [ShippingContainerController],
  providers: [ShippingContainerService],
  exports: [TypeOrmModule],
})
export class ShippingContainerModule {}
