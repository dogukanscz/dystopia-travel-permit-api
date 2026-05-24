import { Test, TestingModule } from '@nestjs/testing';
import { ShippingContainerService } from './shipping-container.service';

describe('ShippingContainerService', () => {
  let service: ShippingContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingContainerService],
    }).compile();

    service = module.get<ShippingContainerService>(ShippingContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
