import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateShippingContainerDto {
  @ApiProperty({ example: 'CONT-2026-001' })
  @IsString()
  @Length(3, 50)
  containerNumber: string;

  @ApiPropertyOptional({ example: 'Refrigerated' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  type?: string;

  @ApiPropertyOptional({ example: 28000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxCapacityKg?: number;
}
