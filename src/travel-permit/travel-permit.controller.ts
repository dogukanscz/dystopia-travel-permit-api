import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { TravelPermitService } from './travel-permit.service';
import { CreateTravelPermitDto } from './dto/create-travel-permit.dto';

@Controller('travel-permit')
export class TravelPermitController {
  constructor(private readonly travelPermitService: TravelPermitService) {}

  @Post()
  create(@Body() createTravelPermitDto: CreateTravelPermitDto) {
    return this.travelPermitService.create(createTravelPermitDto);
  }

  @Get()
  findAll() {
    return this.travelPermitService.findAll();
  }
  @Get(':id/verify')
  verify(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.travelPermitService.findOneForVerification(id);
  }
}
