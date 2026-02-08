import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        try {
            const rental = await this.rentalRepository.create(dto);

            let packageSer = await this.packageSerService.getPackageById(rental.get('packageId')) as PackageService;
            let startTime = rental.get('startTime') as Date;
            let timeMinutes = packageSer.get('timeMinutes');

            let endTime = new Date(startTime.getTime() + timeMinutes * 60 * 1000);

            rental.set('endTime', endTime);
            rental.set('totalCost', packageSer.get('price'));

            await rental.save();

            return rental;
        } catch (error) {
            if (error.message.includes('Client is under 14 years old'))
                throw new HttpException('Запрещено арендовывать компьютер более, чем на 3 часа клиентам младше 14 лет', HttpStatus.BAD_REQUEST)
        }
    }


    async getAllRental() {
        const rentals = await this.rentalRepository.findAll({ include: { all: true } });
        return rentals;
    }
}
