import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Rental } from "src/rentals/rentals.model";
import { Specification } from "src/specifications/specifications.model";

interface ComputerCreationAttrs{
    brand: string;
    model: string;
    status: string;
    specificationId: number;
}

@Table({tableName: 'computers'})
export class Computer extends Model<Computer, ComputerCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true,  autoIncrement: true, primaryKey: true})
    declare id: number;

    @Column({type: DataType.STRING, allowNull: false})
    brand: string;

    @Column({type: DataType.STRING, allowNull: false})
    model: string;

    @Column({type: DataType.ENUM("free", "busy", "maintenance"), defaultValue: "free" })
    status: string;

    @ForeignKey(() => Specification)
    @Column({ type: DataType.INTEGER, allowNull: false })
    specificationId: number;

    @HasMany(() => Rental)
    rentals: Rental[];

    @BelongsTo(() => Specification)
    specification: Specification;
}