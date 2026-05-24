import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trailer } from './entities/trailer.entity';
import { CreateTrailerDto } from './dto/create-trailer.dto';

@Injectable()
export class TrailerService {
  constructor(
    @InjectRepository(Trailer)
    private readonly trailerRepository: Repository<Trailer>,
  ) {}

  create(createTrailerDto: CreateTrailerDto): Promise<Trailer> {
    const trailer = this.trailerRepository.create(createTrailerDto);
    return this.trailerRepository.save(trailer);
  }

  findAll(): Promise<Trailer[]> {
    return this.trailerRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
