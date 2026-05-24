import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoDto } from './dto/create-cargo.dto';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  create(createCargoDto: CreateCargoDto): Promise<Cargo> {
    const cargo = this.cargoRepository.create(createCargoDto);
    return this.cargoRepository.save(cargo);
  }

  findAll(): Promise<Cargo[]> {
    return this.cargoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
