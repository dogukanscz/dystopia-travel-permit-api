import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { CreateTrailerDto } from './dto/create-trailer.dto';

@Controller('trailer')
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @Post()
  create(@Body() createTrailerDto: CreateTrailerDto) {
    return this.trailerService.create(createTrailerDto);
  }

  @Get()
  findAll() {
    return this.trailerService.findAll();
  }
}
