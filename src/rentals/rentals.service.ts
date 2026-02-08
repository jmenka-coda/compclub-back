import { Injectable } from '@nestjs/common';
import { Rental } from './rentals.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRentalDto } from './dto/create-rentals.dto';
import { PackageServiceService } from 'src/package-service/package-service.service';
import { PackageService } from 'src/package-service/package-service.model';

@Injectable()
export class RentalsService {

    constructor(@InjectModel(Rental) private rentalRepository: typeof Rental,
        private packageSerService: PackageServiceService) { }

    async createRental(dto: CreateRentalDto) {
        const rental = await this.rentalRepository.create(dto);

        let packageSer = await this.packageSerService.getPackageById(rental.get('packageId')) as PackageService;
        let startTime = rental.get('startTime') as Date;
        let time = packageSer.get('time');

        let times = time.toString().split(":");
        let endTime = new Date(startTime.getTime() + (Number(times[0]) * 60 * 60 * 1000 + Number(times[1]) * 60 * 1000 + Number(times[1]) * 1000));

        rental.set('endTime', endTime);
        rental.set('totalCost', packageSer.get('price'));

        await rental.save();

        return rental;
    }


    async getAllRental() {
        const rentals = await this.rentalRepository.findAll({ include: { all: true } });
        return rentals;
    }
}
