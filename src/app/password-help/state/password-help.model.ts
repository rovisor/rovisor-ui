export interface LoginResponseModel {
    Token: string;
    Email: string;
    Id: string;
    Name: string;
}

export interface LoginRequestModel {
    email: string;
    password: string;
}

export interface SignUpRequestModel {
    name: string;
    email: string;
    password: string;
}

export interface SignUpResponseModel {
    Token: string;
    Email: string;
    Id: string;
    Name: string;
}

export interface CommonResponseModel {
    message: string;
 }
 