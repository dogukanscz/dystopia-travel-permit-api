import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { CargoUnit } from '../entities/cargo.entity';

export class CreateCargoDto {
  @ApiProperty({ example: 'Limon' })
  @IsString()
  @Length(2, 150)
  contentName: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({
    enum: CargoUnit,
    example: CargoUnit.BOX,
  })
  @IsEnum(CargoUnit)
  unit: CargoUnit;

  @ApiPropertyOptional({ example: '100 kasa limon' })
  @IsOptional()
  @IsString()
  description?: string;
}
