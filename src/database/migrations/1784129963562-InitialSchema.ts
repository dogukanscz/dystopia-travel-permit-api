import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1784129963562 implements MigrationInterface {
  name = 'InitialSchema1784129963562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."cargoes_unit_enum" AS ENUM('PIECE', 'BOX', 'KG', 'TON', 'LITER', 'PALLET')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cargoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content_name" character varying(150) NOT NULL, "quantity" numeric(10,2) NOT NULL, "unit" "public"."cargoes_unit_enum" NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_72f150ffcb9d154fd83bc9a800d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "district" character varying(100) NOT NULL, "neighborhood" character varying(150) NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "address" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "persons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "national_id" character varying(11) NOT NULL, "phone_number" character varying(20), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2f2243843e1b99576ea132d9c0b" UNIQUE ("national_id"), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_containers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "container_number" character varying(50) NOT NULL, "type" character varying(100), "max_capacity_kg" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ec71cdcdae177d39307fdb290d2" UNIQUE ("container_number"), CONSTRAINT "PK_8e509b967f60d57d9c7d08e938d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trailers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plate" character varying(20) NOT NULL, "brand" character varying(100), "model" character varying(100), "production_year" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_82e5c87a5c62c485f375735a139" UNIQUE ("plate"), CONSTRAINT "PK_598af6bec45fafbf70437f32b8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."vehicles_vehicle_type_enum" AS ENUM('CAR', 'TRUCK', 'VAN', 'BUS', 'MOTORCYCLE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vehicle_type" "public"."vehicles_vehicle_type_enum" NOT NULL, "brand" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "model_year" integer NOT NULL, "plate" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf" UNIQUE ("plate"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."travel_permit_persons_role_enum" AS ENUM('OWNER', 'DRIVER', 'PASSENGER', 'EMPLOYEE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "travel_permit_persons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."travel_permit_persons_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "travelPermitId" uuid, "personId" uuid NOT NULL, CONSTRAINT "PK_72f353b20a2a02b8e91f9b27d2c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."travel_permits_status_enum" AS ENUM('ACTIVE', 'EXPIRED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "travel_permits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "permit_number" character varying NOT NULL, "qr_code" text, "starts_at" TIMESTAMP NOT NULL, "expires_at" TIMESTAMP NOT NULL, "status" "public"."travel_permits_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid NOT NULL, "startLocationId" uuid NOT NULL, "endLocationId" uuid NOT NULL, "vehicleId" uuid NOT NULL, "trailerId" uuid, "containerId" uuid, CONSTRAINT "UQ_0ecf4ec5f1d395381bd0c1fe72d" UNIQUE ("permit_number"), CONSTRAINT "PK_849a02f1b4a98385cad33858db7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."travel_permit_cargoes_placement_enum" AS ENUM('VEHICLE', 'TRAILER', 'CONTAINER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "travel_permit_cargoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "placement" "public"."travel_permit_cargoes_placement_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "travelPermitId" uuid, "cargoId" uuid NOT NULL, CONSTRAINT "PK_960550c619de974386c1ea6d408" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permit_persons" ADD CONSTRAINT "FK_d57b635c76c5682df2cdf125998" FOREIGN KEY ("travelPermitId") REFERENCES "travel_permits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permit_persons" ADD CONSTRAINT "FK_0b78dee5d389e2fb90884d8d823" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" ADD CONSTRAINT "FK_d95ac5f15fc63424078287b97f5" FOREIGN KEY ("ownerId") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" ADD CONSTRAINT "FK_92b02b0108e5e22fcb982db7d52" FOREIGN KEY ("startLocationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" ADD CONSTRAINT "FK_a44555a83c06f52963a02997628" FOREIGN KEY ("endLocationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" ADD CONSTRAINT "FK_cd7f608a84be4b60f13e472c1ff" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" ADD CONSTRAINT "FK_10494008cdb472b5d80f710a9bf" FOREIGN KEY ("trailerId") REFERENCES "trailers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" ADD CONSTRAINT "FK_e9d247b09962217cf0856858a9d" FOREIGN KEY ("containerId") REFERENCES "shipping_containers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permit_cargoes" ADD CONSTRAINT "FK_4ea6578a11a1f7d64877e9fdf07" FOREIGN KEY ("travelPermitId") REFERENCES "travel_permits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permit_cargoes" ADD CONSTRAINT "FK_d771c0273906c39c0ec9644943f" FOREIGN KEY ("cargoId") REFERENCES "cargoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "travel_permit_cargoes" DROP CONSTRAINT "FK_d771c0273906c39c0ec9644943f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permit_cargoes" DROP CONSTRAINT "FK_4ea6578a11a1f7d64877e9fdf07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" DROP CONSTRAINT "FK_e9d247b09962217cf0856858a9d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" DROP CONSTRAINT "FK_10494008cdb472b5d80f710a9bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" DROP CONSTRAINT "FK_cd7f608a84be4b60f13e472c1ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" DROP CONSTRAINT "FK_a44555a83c06f52963a02997628"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" DROP CONSTRAINT "FK_92b02b0108e5e22fcb982db7d52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permits" DROP CONSTRAINT "FK_d95ac5f15fc63424078287b97f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permit_persons" DROP CONSTRAINT "FK_0b78dee5d389e2fb90884d8d823"`,
    );
    await queryRunner.query(
      `ALTER TABLE "travel_permit_persons" DROP CONSTRAINT "FK_d57b635c76c5682df2cdf125998"`,
    );
    await queryRunner.query(`DROP TABLE "travel_permit_cargoes"`);
    await queryRunner.query(
      `DROP TYPE "public"."travel_permit_cargoes_placement_enum"`,
    );
    await queryRunner.query(`DROP TABLE "travel_permits"`);
    await queryRunner.query(`DROP TYPE "public"."travel_permits_status_enum"`);
    await queryRunner.query(`DROP TABLE "travel_permit_persons"`);
    await queryRunner.query(
      `DROP TYPE "public"."travel_permit_persons_role_enum"`,
    );
    await queryRunner.query(`DROP TABLE "vehicles"`);
    await queryRunner.query(`DROP TYPE "public"."vehicles_vehicle_type_enum"`);
    await queryRunner.query(`DROP TABLE "trailers"`);
    await queryRunner.query(`DROP TABLE "shipping_containers"`);
    await queryRunner.query(`DROP TABLE "persons"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "cargoes"`);
    await queryRunner.query(`DROP TYPE "public"."cargoes_unit_enum"`);
  }
}
