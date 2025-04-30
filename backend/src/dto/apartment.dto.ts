export interface CreateApartmentDto {
    unitName: string;
    unitNumber: string;
    project: string;
    description?: string;
    price: number;
    imageUrl?: string;
}
