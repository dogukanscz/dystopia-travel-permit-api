import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShippingContainerService } from './shipping-container.service';
import { CreateShippingContainerDto } from './dto/create-shipping-container.dto';

@Controller('shipping-container')
export class ShippingContainerController {
  constructor(
    private readonly shippingContainerService: ShippingContainerService,
  ) {}

  @Post()
  create(@Body() createShippingContainerDto: CreateShippingContainerDto) {
    return this.shippingContainerService.create(createShippingContainerDto);
  }

  @Get()
  findAll() {
    return this.shippingContainerService.findAll();
  }
}
