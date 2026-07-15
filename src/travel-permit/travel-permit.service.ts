import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPermit } from './entities/travel-permit.entity';
import { TravelPermitPerson } from './entities/travel-permit-person.entity';
import { TravelPermitCargo } from './entities/travel-permit-cargo.entity';
import { CreateTravelPermitDto } from './dto/create-travel-permit.dto';
import { Person } from '../person/entities/person.entity';
import { Location } from '../location/entities/location.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Trailer } from '../trailer/entities/trailer.entity';
import { ShippingContainer } from '../shipping-container/entities/shipping-container.entity';
import { Cargo } from '../cargo/entities/cargo.entity';
import { randomUUID } from 'node:crypto';
import * as QRCode from 'qrcode';

@Injectable()
export class TravelPermitService {
  constructor(
    @InjectRepository(TravelPermit)
    private readonly travelPermitRepository: Repository<TravelPermit>,

    @InjectRepository(TravelPermitPerson)
    private readonly travelPermitPersonRepository: Repository<TravelPermitPerson>,

    @InjectRepository(TravelPermitCargo)
    private readonly travelPermitCargoRepository: Repository<TravelPermitCargo>,

    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Trailer)
    private readonly trailerRepository: Repository<Trailer>,

    @InjectRepository(ShippingContainer)
    private readonly shippingContainerRepository: Repository<ShippingContainer>,

    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  async create(createTravelPermitDto: CreateTravelPermitDto) {
    const owner = await this.personRepository.findOneBy({
      id: createTravelPermitDto.ownerId,
    });

    if (!owner) {
      throw new NotFoundException('Owner person not found');
    }

    const startLocation = await this.locationRepository.findOneBy({
      id: createTravelPermitDto.startLocationId,
    });

    if (!startLocation) {
      throw new NotFoundException('Start location not found');
    }

    const endLocation = await this.locationRepository.findOneBy({
      id: createTravelPermitDto.endLocationId,
    });

    if (!endLocation) {
      throw new NotFoundException('End location not found');
    }

    const vehicle = await this.vehicleRepository.findOneBy({
      id: createTravelPermitDto.vehicleId,
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    let trailer: Trailer | null = null;

    if (createTravelPermitDto.trailerId) {
      trailer = await this.trailerRepository.findOneBy({
        id: createTravelPermitDto.trailerId,
      });

      if (!trailer) {
        throw new NotFoundException('Trailer not found');
      }
    }

    let container: ShippingContainer | null = null;

    if (createTravelPermitDto.containerId) {
      container = await this.shippingContainerRepository.findOneBy({
        id: createTravelPermitDto.containerId,
      });

      if (!container) {
        throw new NotFoundException('Shipping container not found');
      }
    }

    const permitNumber = `TP-${Date.now()}`;

    const travelPermit = this.travelPermitRepository.create({
      permitNumber,
      owner,
      startLocation,
      endLocation,
      vehicle,
      trailer,
      container,
      qrCode: randomUUID(),
    });

    const savedPermit = await this.travelPermitRepository.save(travelPermit);

    if (createTravelPermitDto.persons?.length) {
      const permitPersons = await Promise.all(
        createTravelPermitDto.persons.map(async (item) => {
          const person = await this.personRepository.findOneBy({
            id: item.personId,
          });

          if (!person) {
            throw new NotFoundException(`Person not found: ${item.personId}`);
          }

          return this.travelPermitPersonRepository.create({
            travelPermit: savedPermit,
            person,
            role: item.role,
          });
        }),
      );

      await this.travelPermitPersonRepository.save(permitPersons);
    }

    if (createTravelPermitDto.cargoes?.length) {
      const permitCargoes = await Promise.all(
        createTravelPermitDto.cargoes.map(async (item) => {
          const cargo = await this.cargoRepository.findOneBy({
            id: item.cargoId,
          });

          if (!cargo) {
            throw new NotFoundException(`Cargo not found: ${item.cargoId}`);
          }

          return this.travelPermitCargoRepository.create({
            travelPermit: savedPermit,
            cargo,
            placement: item.placement,
          });
        }),
      );

      await this.travelPermitCargoRepository.save(permitCargoes);
    }

    return this.findOneForVerification(savedPermit.id);
  }

  findAll(): Promise<TravelPermit[]> {
    return this.travelPermitRepository.find({
      relations: {
        owner: true,
        startLocation: true,
        endLocation: true,
        vehicle: true,
        trailer: true,
        container: true,
        permittedPersons: {
          person: true,
        },
        cargoes: {
          cargo: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOneForVerification(id: string) {
    const travelPermit = await this.travelPermitRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        startLocation: true,
        endLocation: true,
        vehicle: true,
        trailer: true,
        container: true,
        permittedPersons: {
          person: true,
        },
        cargoes: {
          cargo: true,
        },
      },
    });

    if (!travelPermit) {
      throw new NotFoundException('Travel permit not found');
    }

    return {
      permitNumber: travelPermit.permitNumber,
      qrCode: travelPermit.qrCode,
      status: travelPermit.status,
      validity: {
        startsAt: travelPermit.startsAt,
        expiresAt: travelPermit.expiresAt,
      },
      owner: {
        firstName: travelPermit.owner.firstName,
        lastName: travelPermit.owner.lastName,
        nationalId: travelPermit.owner.nationalId,
      },
      permittedPersons: travelPermit.permittedPersons.map((item) => ({
        firstName: item.person.firstName,
        lastName: item.person.lastName,
        nationalId: item.person.nationalId,
        role: item.role,
      })),
      vehicle: {
        vehicleType: travelPermit.vehicle.vehicleType,
        brand: travelPermit.vehicle.brand,
        model: travelPermit.vehicle.model,
        modelYear: travelPermit.vehicle.modelYear,
        plate: travelPermit.vehicle.plate,
      },
      trailer: travelPermit.trailer
        ? {
            plate: travelPermit.trailer.plate,
            brand: travelPermit.trailer.brand,
            model: travelPermit.trailer.model,
            productionYear: travelPermit.trailer.productionYear,
          }
        : null,
      container: travelPermit.container
        ? {
            containerNumber: travelPermit.container.containerNumber,
            type: travelPermit.container.type,
            maxCapacityKg: travelPermit.container.maxCapacityKg,
          }
        : null,
      cargoes: travelPermit.cargoes.map((item) => ({
        contentName: item.cargo.contentName,
        quantity: item.cargo.quantity,
        unit: item.cargo.unit,
        description: item.cargo.description,
        placement: item.placement,
      })),
      route: {
        from: {
          country: travelPermit.startLocation.country,
          city: travelPermit.startLocation.city,
          district: travelPermit.startLocation.district,
          neighborhood: travelPermit.startLocation.neighborhood,
          latitude: travelPermit.startLocation.latitude,
          longitude: travelPermit.startLocation.longitude,
          address: travelPermit.startLocation.address,
        },
        to: {
          country: travelPermit.endLocation.country,
          city: travelPermit.endLocation.city,
          district: travelPermit.endLocation.district,
          neighborhood: travelPermit.endLocation.neighborhood,
          latitude: travelPermit.endLocation.latitude,
          longitude: travelPermit.endLocation.longitude,
          address: travelPermit.endLocation.address,
        },
      },
    };
  }
  async findOneByQrCode(qrCode: string) {
    const travelPermit = await this.travelPermitRepository.findOneBy({
      qrCode,
    });

    if (!travelPermit) {
      throw new NotFoundException('Travel permit not found for this QR code');
    }

    return this.findOneForVerification(travelPermit.id);
  }

  async generateQrCode(id: string): Promise<string> {
    const travelPermit = await this.travelPermitRepository.findOneBy({
      id,
    });

    if (!travelPermit) {
      throw new NotFoundException('Travel permit not found');
    }

    if (!travelPermit.qrCode) {
      throw new NotFoundException('QR code not found for this travel permit');
    }

    const baseUrl = process.env.APP_URL ?? 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/travel-permit/qr/${travelPermit.qrCode}`;

    return QRCode.toString(verificationUrl, {
      type: 'svg',
      width: 300,
      margin: 2,
    });
  }
}
