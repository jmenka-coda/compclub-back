import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Administrator } from "src/administrators/administrators.model";
import { Computer } from "src/computers/computers.model";
import { PackageService } from "src/package-service/package-service.model";
import { Visitor } from "src/visitor/visitor.model";

interface RentalCreationAttrs {
    adminId: number;
    packageId: number;
    visitorId: number;
    computerId: number;
    startTime: Date;
}

@Table({ tableName: 'rentals' })
export class Rental extends Model<Rental, RentalCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ForeignKey(() => Administrator)
    @Column({ type: DataType.INTEGER, allowNull: false })
    adminId: number;

    @ForeignKey(() => PackageService)
    @Column({ type: DataType.INTEGER, allowNull: false })
    packageId: number;

    @ForeignKey(() => Visitor)
    @Column({ type: DataType.INTEGER, allowNull: false })
    visitorId: number;

    @ForeignKey(() => Computer)
    @Column({ type: DataType.INTEGER, allowNull: false })
    computerId: number;

    @Column({ type: DataType.DATE, allowNull: false })
    startTime: Date;

    @Column({ type: DataType.DATE})
    endTime: Date;

    @Column({ type: DataType.ENUM("waiting", "active", "completed", "canceled"), allowNull: false, defaultValue: "waiting" })
    status: string;

    @Column({ type: DataType.DECIMAL(5, 2) })
    totalCost: number;


    @BelongsTo(() => Administrator)
    admin: Administrator;

    @BelongsTo(() => PackageService)
    package: PackageService;

    @BelongsTo(() => Visitor)
    visitor: Visitor;

    @BelongsTo(() => Computer)
    computer: Computer
}