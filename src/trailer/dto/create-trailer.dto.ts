import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreateTrailerDto {
  @ApiProperty({ example: '48 RMR 456' })
  @IsString()
  @Length(5, 20)
  plate: string;

  @ApiPropertyOptional({ example: 'Krone' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  brand?: string;

  @ApiPropertyOptional({ example: 'Mega Liner' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  model?: string;

  @ApiPropertyOptional({ example: 2020 })
  @IsOptional()
  @IsInt()
  @Min(1950)
  @Max(2100)
  productionYear?: number;
}
