import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';
import { VehicleType } from '../entities/vehicle.entity';

export class CreateVehicleDto {
  @ApiProperty({
    enum: VehicleType,
    example: VehicleType.TRUCK,
  })
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @ApiProperty({ example: 'Mercedes' })
  @IsString()
  @Length(2, 100)
  brand: string;

  @ApiProperty({ example: 'Actros' })
  @IsString()
  @Length(1, 100)
  model: string;

  @ApiProperty({ example: 2022 })
  @IsInt()
  @Min(1950)
  @Max(2100)
  modelYear: number;

  @ApiProperty({ example: '48 ABC 123' })
  @IsString()
  @Length(5, 20)
  plate: string;
}
