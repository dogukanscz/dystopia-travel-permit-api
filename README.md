# Dystopian Travel Permit API

A backend API built with NestJS, TypeORM, and PostgreSQL for managing travel permits in a dystopian country with strict transportation rules.

The system allows creating travel permits between two authorized locations for specific persons, vehicles, trailers, shipping containers, and cargoes.

## Technologies

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Swagger UI
- Docker and Docker Compose
- TypeORM migrations
- class-validator
- class-transformer

## Features

- Person management
- Location management
- Vehicle management
- Trailer management
- Shipping container management
- Cargo management
- Travel permit creation
- Automatic 30-day permit validity
- Clean verification response for police checkpoint / QR scenario
- Swagger API documentation

## Core Business Rules

- A travel permit is valid for 30 days after creation.
- A travel permit is valid only between two locations.
- A travel permit is valid only for a selected vehicle.
- A travel permit may include one or more permitted persons.
- A travel permit may include trailer, shipping container, and cargo information.
- A travel permit can be verified through a dedicated verification endpoint.

## Database Design

Main entities:

- Person
- Location
- Vehicle
- Trailer
- ShippingContainer
- Cargo
- TravelPermit
- TravelPermitPerson
- TravelPermitCargo

The project follows a normalized database structure. Reusable data such as persons, vehicles, locations, trailers, containers, and cargoes are stored in separate tables. The TravelPermit entity connects these records through relationships.

## API Documentation

After starting the project, Swagger UI is available at:

http://localhost:3000/api

## Installation

Clone the repository:

git clone <repository-url>
cd dystopia-travel-permit-api

Install dependencies:

npm install

Create a .env file based on .env.example:

cp .env.example .env

Example .env:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=dystopia_travel_db

Create the PostgreSQL database:

createdb dystopia_travel_db

Apply the database migrations:

```bash
npm run migration:run
```

Start the application:

npm run start:dev

The application will run at:

http://localhost:3000

Swagger documentation:

http://localhost:3000/api

## Docker

Docker Compose starts PostgreSQL, waits for it to become healthy, applies pending
migrations, and then starts the API:

```bash
docker compose up --build
```

The API is exposed on port `3000`. Docker PostgreSQL is exposed on host port
`5433` to avoid conflicting with a local PostgreSQL installation on port `5432`.

The PostgreSQL data is stored in the named `postgres_data` volume, so it remains
available when containers are recreated. To stop and remove the containers while
keeping the data:

```bash
docker compose down
```

Use `docker compose down -v` only when the database volume should also be deleted.

## Database Migrations

The database schema is versioned in `src/database/migrations` and automatic schema
synchronization is disabled. Available commands:

```bash
npm run migration:generate
npm run migration:run
npm run migration:revert
```

## Main Endpoints

Person:

- POST /person
- GET /person

Location:

- POST /location
- GET /location

Vehicle:

- POST /vehicle
- GET /vehicle

Trailer:

- POST /trailer
- GET /trailer

Shipping Container:

- POST /shipping-container
- GET /shipping-container

Cargo:

- POST /cargo
- GET /cargo

Travel Permit:

- POST /travel-permit
- GET /travel-permit
- GET /travel-permit/:id/verify

## Development Notes

This project was developed as a database-oriented backend challenge. The focus is on:

- Normalized database design
- ORM-based entity definitions
- Clean module, service, and controller structure
- TypeORM relationships
- Validation with DTOs
- Swagger-based API documentation

## Future Improvements

Planned improvements for v2:

- QR code image generation
- Seed data
- Update and delete endpoints
- Unit tests
- Basic frontend interface
- Role-based authorization
