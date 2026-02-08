import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Rental } from "src/rentals/rentals.model";

//ФИО
//дата рождения
//стаж
//дата приема на работу
interface AdministratorCreationAttrs {
    fullName: string;
    dateOfBirth: Date;
    experience: number;
    hiringDate: Date;
    password: string;
}

@Table({ tableName: 'administrator' })
export class Administrator extends Model<Administrator, AdministratorCreationAttrs>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string;

    @Column({ type: DataType.STRING, unique: true })
    login: string;

    @Column({ type: DataType.STRING, unique: true,allowNull: false })
    password: string;

    @Column({ type: DataType.DATE, allowNull: false })
    dateOfBirth: Date;

    @Column({ type: DataType.DECIMAL(4, 2), defaultValue: 0 })
    experience: number;

    @Column({ type: DataType.DATE, allowNull: false })
    hiringDate: Date;

    @HasMany(() => Rental)
    rentals: Rental[];
}


