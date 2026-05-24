import { Test, TestingModule } from '@nestjs/testing';
import { ShippingContainerController } from './shipping-container.controller';

describe('ShippingContainerController', () => {
  let controller: ShippingContainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingContainerController],
    }).compile();

    controller = module.get<ShippingContainerController>(ShippingContainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
