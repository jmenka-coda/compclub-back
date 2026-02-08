import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Rental } from "src/rentals/rentals.model";

interface PackageServiceCreationAttr {
    name: string;
    time: Date;
    typeSpecifComp: string;
    timeDay: string;
    price: number;
}

@Table({ tableName: 'package_service' })
export class PackageService extends Model<PackageService, PackageServiceCreationAttr>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string

    @Column({ type: DataType.TIME, allowNull: false })
    time: Date;

    @Column({ type: DataType.ENUM("weak", "average", "powerful"), allowNull: false })
    typeSpecifComp: string;

    @Column({ type: DataType.ENUM("morning", "аfternoon", "evening", "night"), allowNull: false })
    timeDay: string;

    @Column({ type: DataType.DECIMAL(4, 2), allowNull: false })
    price: number;

    @HasMany(() => Rental)
    rentals: Rental[];
}