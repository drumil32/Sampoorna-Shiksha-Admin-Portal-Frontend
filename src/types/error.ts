export interface IBackEndError {
    statusCode: number;
    message: string;
    action: Action
}
export enum Action {
    SIGNUP = 'signup',
    SIGNIN = 'signin',
    AUTH = 'auth',
    SCHOOL = 'school'
}