import { Test, TestingModule } from '@nestjs/testing';
import { TravelPermitController } from './travel-permit.controller';

describe('TravelPermitController', () => {
  let controller: TravelPermitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPermitController],
    }).compile();

    controller = module.get<TravelPermitController>(TravelPermitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
