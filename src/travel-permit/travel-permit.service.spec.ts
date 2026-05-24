import { Test, TestingModule } from '@nestjs/testing';
import { TravelPermitService } from './travel-permit.service';

describe('TravelPermitService', () => {
  let service: TravelPermitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPermitService],
    }).compile();

    service = module.get<TravelPermitService>(TravelPermitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
