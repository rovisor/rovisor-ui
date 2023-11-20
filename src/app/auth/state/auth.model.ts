export interface LoginResponseModel {
    token: string;
    email: string;
    Id: string;
    name: string;
}

export interface SignupRequestModel {
    email: string;
    password: string;
    name: string;
}

export interface SignupResponseModel {
    email: string;
    id: string;
    name: string;
}