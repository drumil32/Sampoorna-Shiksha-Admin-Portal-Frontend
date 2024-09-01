import { IToy } from "./School";

export enum VendorOrderType {
    SCHOOL = 'SCHOOL',
    NGO = 'NGO'
};

export interface VendorCartItem {
    toyId: string;
    quantity: number;
    brand: string;
    subBrand: string;
    price: number;
};

export interface ShowVendorOrder {
    toy: IToy,
    quantity: number
}