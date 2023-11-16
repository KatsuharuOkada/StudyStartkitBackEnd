
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum GENDER {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class CreateUserInput {
    email: string;
    fullname: string;
    gender: GENDER;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): MutationResponse | Promise<MutationResponse>;
}

export class MutationResponse {
    statusCode?: number;
    message?: string;
}

export abstract class IQuery {
    abstract getUserInformation(userId?: number): UserQueryResponse | Promise<UserQueryResponse>;
}

export class UserInformation {
    userId?: number;
    userName?: string;
    email?: string;
    gender?: number;
}

export class UserQueryResponse {
    statusCode?: number;
    message?: string;
    data?: UserInformation;
}

export type JSON = any;
