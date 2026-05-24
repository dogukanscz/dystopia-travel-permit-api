import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermitPersonRole } from '../entities/travel-permit-person.entity';
import { CargoPlacement } from '../entities/travel-permit-cargo.entity';

class PermitPersonDto {
  @ApiProperty({
    example: 'df100b02-6e82-4472-802b-0db581222a4b',
  })
  @IsUUID()
  personId: string;

  @ApiProperty({
    enum: PermitPersonRole,
    example: PermitPersonRole.DRIVER,
  })
  @IsEnum(PermitPersonRole)
  role: PermitPersonRole;
}

class PermitCargoDto {
  @ApiProperty({
    example: '1da09d99-19d6-49c4-b066-c6377dbc3e22',
  })
  @IsUUID()
  cargoId: string;

  @ApiProperty({
    enum: CargoPlacement,
    example: CargoPlacement.CONTAINER,
  })
  @IsEnum(CargoPlacement)
  placement: CargoPlacement;
}

export class CreateTravelPermitDto {
  @ApiProperty({
    example: 'df100b02-6e82-4472-802b-0db581222a4b',
  })
  @IsUUID()
  ownerId: string;

  @ApiProperty({
    example: '9d91a7ea-3d76-45d3-8af6-8c06678ec8a2',
  })
  @IsUUID()
  startLocationId: string;

  @ApiProperty({
    example: '72765792-0455-4456-a08d-2a290c627537',
  })
  @IsUUID()
  endLocationId: string;

  @ApiProperty({
    example: '92fce171-8891-431a-a411-b244d1c2f471',
  })
  @IsUUID()
  vehicleId: string;

  @ApiPropertyOptional({
    example: 'b57fc210-13d9-49bb-bb45-bc4fad5716bd',
  })
  @IsOptional()
  @IsUUID()
  trailerId?: string;

  @ApiPropertyOptional({
    example: 'b469c487-7be9-4bf5-a7ec-3fceac2e909f',
  })
  @IsOptional()
  @IsUUID()
  containerId?: string;

  @ApiPropertyOptional({
    type: [PermitPersonDto],
    example: [
      {
        personId: 'df100b02-6e82-4472-802b-0db581222a4b',
        role: 'DRIVER',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermitPersonDto)
  persons?: PermitPersonDto[];

  @ApiPropertyOptional({
    type: [PermitCargoDto],
    example: [
      {
        cargoId: '1da09d99-19d6-49c4-b066-c6377dbc3e22',
        placement: 'CONTAINER',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermitCargoDto)
  cargoes?: PermitCargoDto[];
}
