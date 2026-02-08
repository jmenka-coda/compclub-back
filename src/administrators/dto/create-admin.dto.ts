export class CreateAdministratorDto {
    readonly fullName: string;
    readonly password: string;
    readonly dateOfBirth: Date;
    readonly experience: number;
    readonly hiringDate: Date;
}