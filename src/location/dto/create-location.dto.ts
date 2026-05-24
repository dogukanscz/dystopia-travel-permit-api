import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Türkiye' })
  @IsString()
  @Length(2, 100)
  country: string;

  @ApiProperty({ example: 'Muğla' })
  @IsString()
  @Length(2, 100)
  city: string;

  @ApiProperty({ example: 'Menteşe' })
  @IsString()
  @Length(2, 100)
  district: string;

  @ApiProperty({ example: 'Kötekli' })
  @IsString()
  @Length(2, 150)
  neighborhood: string;

  @ApiProperty({ example: 37.1642 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 28.3736 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({
    example: 'Kötekli Mahallesi, Muğla',
  })
  @IsOptional()
  @IsString()
  address?: string;
}
