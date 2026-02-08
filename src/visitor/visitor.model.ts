import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Rental } from "src/rentals/rentals.model";

interface VisitorCreationAttrs {
    fullName: string;
    dateOfBirth: Date;
    phone: number;
}

@Table({ tableName: 'visitors' })
export class Visitor extends Model<Visitor, VisitorCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string;

    @Column({ type: DataType.DATE, allowNull: false })
    dateOfBirth: Date;

    @Column({ type: DataType.INTEGER })
    phone: number;

    @HasMany(() => Rental)
    rentals: Rental[];
}