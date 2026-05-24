import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingContainer } from './entities/shipping-container.entity';
import { CreateShippingContainerDto } from './dto/create-shipping-container.dto';

@Injectable()
export class ShippingContainerService {
  constructor(
    @InjectRepository(ShippingContainer)
    private readonly shippingContainerRepository: Repository<ShippingContainer>,
  ) {}

  create(
    createShippingContainerDto: CreateShippingContainerDto,
  ): Promise<ShippingContainer> {
    const shippingContainer = this.shippingContainerRepository.create(
      createShippingContainerDto,
    );

    return this.shippingContainerRepository.save(shippingContainer);
  }

  findAll(): Promise<ShippingContainer[]> {
    return this.shippingContainerRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
