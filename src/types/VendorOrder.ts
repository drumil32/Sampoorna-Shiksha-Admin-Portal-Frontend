export enum VendorOrderType {
    SCHOOL = 'SCHOOL',
    NGO = 'NGO'
};

export interface VendorCartItem {
    toyId: string;
    quantity: number;
    brand: string;
    subBrand: string;
};