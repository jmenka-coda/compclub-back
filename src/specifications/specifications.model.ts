import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Computer } from "src/computers/computers.model";

interface SpecificationCreationAttrs{
    typeSpecifComp: string;
    monitor: string;
    RAM: string;
    graphicsCard: string;
}

@Table({tableName: 'specifications'})
export class Specification extends Model<Specification, SpecificationCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true,  autoIncrement: true, primaryKey: true})
    declare id: number;

    @Column({ type: DataType.ENUM("weak", "average", "powerful"), allowNull: false })
    typeSpecifComp: string;

    @Column({ type: DataType.STRING, allowNull: false })
    monitor: string;

    @Column({ type: DataType.STRING, allowNull: false })
    RAM: string;

    @Column({ type: DataType.STRING, allowNull: false })
    graphicsCard: string;

    @HasMany(() => Computer)
    computers: Computer[];
}