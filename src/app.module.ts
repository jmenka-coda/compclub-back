import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdministratorsModule } from './administrators/administrators.module';
import { ConfigModule } from "@nestjs/config";
import { Administrator } from "./administrators/administrators.model";
import { PackageServiceModule } from './package-service/package-service.module';
import { VisitorModule } from './visitor/visitor.module';
import { SpecificationsModule } from './specifications/specifications.module';
import { ComputersModule } from "./computers/computers.module";
import { Computer } from "./computers/computers.model";
import { PackageService } from "./package-service/package-service.model";
import { Rental } from "./rentals/rentals.model";
import { Specification } from "./specifications/specifications.model";
import { Visitor } from "./visitor/visitor.model";
import { RentalsModule } from "./rentals/rentals.module";
import { DatabaseModule } from "./database/database.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [Administrator, Computer, PackageService, Rental, Specification, Visitor],
          autoLoadModels: true,
        }),
        AdministratorsModule,
        PackageServiceModule,
        VisitorModule,
        SpecificationsModule,
        ComputersModule,
        RentalsModule,
        DatabaseModule
      ],
})
export class AppModule{}