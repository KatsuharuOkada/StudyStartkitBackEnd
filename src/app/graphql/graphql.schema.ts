
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum GENDER {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class LoginInput {
    email: string;
    password: string;
}

export class CategoryInput {
    categoryName: string;
    description: string;
}

export class CreateUserInput {
    email: string;
    fullname: string;
    gender: GENDER;
    password: string;
}

export abstract class IQuery {
    abstract login(input: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract getCategory(categoryId: number): CategoryDetail | Promise<CategoryDetail>;

    abstract getUserInformation(userId?: number): UserQueryResponse | Promise<UserQueryResponse>;
}

export class LoginResponse {
    accessToken: string;
    email: string;
    Id: string;
}

export abstract class IMutation {
    abstract createCategory(input: CategoryInput): MutationResponse | Promise<MutationResponse>;

    abstract createUser(createUserInput: CreateUserInput): MutationResponse | Promise<MutationResponse>;
}

export class CategoryDetail {
    id: number;
    name?: string;
}

export class MutationResponse {
    statusCode: number;
    msg?: string;
    data?: string;
    error?: Error;
}

export class UserInformation {
    userId?: number;
    userName?: string;
    email?: string;
    gender?: string;
}

export class UserQueryResponse {
    statusCode?: number;
    message?: string;
    data?: UserInformation;
    error?: Error;
}

export class Error {
    errorCode: string;
    message?: string;
    details: ErrorDetail[];
}

export class ErrorDetail {
    message?: string;
    type?: string;
    key?: string;
    value?: string;
}

export type JSON = any;
