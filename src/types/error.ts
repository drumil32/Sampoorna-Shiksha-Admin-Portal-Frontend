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
    SCHOOL_DETILS = 'school_details',
    PLACE_VENDOR_ORDER = 'place_vendor_order'
}