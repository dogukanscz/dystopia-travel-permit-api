import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    example: 'Dogukan',
    description: 'First name of the person',
  })
  @IsString()
  @Length(2, 100)
  firstName: string;

  @ApiProperty({
    example: 'Sacmaozu',
    description: 'Last name of the person',
  })
  @IsString()
  @Length(2, 100)
  lastName: string;

  @ApiProperty({
    example: '12345678901',
    description: 'National identity number of the person',
  })
  @IsString()
  @Length(11, 11)
  nationalId: string;

  @ApiPropertyOptional({
    example: '05551234567',
    description: 'Optional phone number of the person',
  })
  @IsOptional()
  @IsString()
  @Length(10, 20)
  phoneNumber?: string;
}
