
export interface IBackEndError {
    statusCode: number;
    message: string;
    action: Action
}

export enum Action {
    SIGNUP = 'signup',
    SIGNIN = 'signin',
    AUTH = 'auth',
    SCHOOL = 'school',
    SCHOOL_DETAILS = 'school_details',
    PLACE_VENDOR_ORDER = 'place_vendor_order',
    UPDATE_SCHOOL_ORDER = 'update_school_order',
    GET_VENDOR_ORDER = "get_vendor_orders",
    VENDOR_ORDER_HISTORY = "vendor order history",
    TOY = "toy",
}