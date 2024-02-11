export interface LoginResponseModel {
    token: string;
    email: string;
    Id: string;
    name: string;
}

export interface SignUpRequestModel {
    name: string;
    email: string;
    password: string;
}

export interface SignUpResponseModel {
    token: string;
    email: string;
    Id: string;
    name: string;
}