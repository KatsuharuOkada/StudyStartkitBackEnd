
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum AddStampReason {
    INSTALL = "INSTALL",
    SCAN = "SCAN"
}

export interface IncentiveInput {
    stampCount?: number;
    description?: string;
    status?: number;
}

export interface Error {
    errorCode: string;
    message?: string;
    details: ErrorDetail[];
}

export interface ErrorDetail {
    message?: string;
    type?: string;
    key?: string;
    value?: string;
}

export interface Incentive {
    id?: number;
    stampCount?: number;
    description?: string;
    status?: number;
    createdAt?: DateTime;
    updatedAt?: DateTime;
}

export interface MutationResponse {
    statusCode: number;
    data?: string;
    error?: Error;
}

export interface IQuery {
    getTest(): MutationResponse | Promise<MutationResponse>;
    getIncentives(): Incentive[] | Promise<Incentive[]>;
}

export type DateTime = any;
export type JSON = any;
export type Upload = any;
