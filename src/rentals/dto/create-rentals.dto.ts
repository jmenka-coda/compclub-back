export class CreateRentalDto {
    readonly adminId: number;
    readonly packageId: number;
    readonly visitorId: number;
    readonly computerId: number;
    readonly startTime: Date;
}