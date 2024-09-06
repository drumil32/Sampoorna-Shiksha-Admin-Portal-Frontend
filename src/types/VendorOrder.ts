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
};

export enum VendorOrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    DISPATCHED = 'DISPATCHED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
};

export interface VendorOrderStatusInfo{
    timestamps: string;
    personName: string;
    contactNumber: string;
    status: VendorOrderStatus
}

export interface VendorOrder {
    id: string;
    listOfToysSentLink: [{
        toy: IToy;
        quantity: number;
        price: number;
    }],
    brand: string;
    subBrand: string;
    address: string;
    type: VendorOrderType;
    description: string;
    status: VendorOrderStatusInfo[];
}