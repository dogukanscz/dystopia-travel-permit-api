import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
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
  @Get('qr/:qrCode')
  verifyByQrCode(@Param('qrCode', new ParseUUIDPipe()) qrCode: string) {
    return this.travelPermitService.findOneByQrCode(qrCode);
  }
  @Get(':id/qr')
  @Header('Content-Type', 'image/svg+xml')
  generateQrCode(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.travelPermitService.generateQrCode(id);
  }
}
