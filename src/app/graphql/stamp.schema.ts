
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

export interface Error {
    errorCode: string;
    message?: string;
    details?: ErrorDetail[];
}

export interface ErrorDetail {
    message?: string;
    type?: string;
    key?: string;
    value?: string;
}

export interface ExchangeStampMutationResponse {
    statusCode: number;
    data?: number;
    error?: Error;
}

export interface FirstLoginLineResponse {
    statusCode: number;
    data: boolean;
    error?: Error;
}

export interface Incentive {
    id: number;
    stampCount: number;
    description: string;
}

export interface IncentivesQueryResponse {
    statusCode: number;
    data?: Incentive[];
    error?: Error;
}

export interface IMutation {
    useIncentive(userIncentiveId?: number): UserIncentiveMutationResponse | Promise<UserIncentiveMutationResponse>;
    exchangeStamp(incentiveId: number): ExchangeStampMutationResponse | Promise<ExchangeStampMutationResponse>;
    addStamp(qrCode: string, userId: string): MutationResponse | Promise<MutationResponse>;
}

export interface MutationResponse {
    statusCode: number;
    data?: string;
    error?: Error;
}

export interface IQuery {
    getIncentives(): IncentivesQueryResponse | Promise<IncentivesQueryResponse>;
    getUserIncentives(userId?: string): UserIncentiveResponse | Promise<UserIncentiveResponse>;
    getUserStamps(): UserStampsQueryResponse | Promise<UserStampsQueryResponse>;
    getSummary(): SummaryQueryResponse | Promise<SummaryQueryResponse>;
    isFirstLoginLine(userId: string): FirstLoginLineResponse | Promise<FirstLoginLineResponse>;
}

export interface SummaryQueryResponse {
    statusCode: number;
    data?: UserSummary;
    error?: Error;
}

export interface UserIncentive {
    id: number;
    stampCount: number;
    isUsed: boolean;
    expiredAt?: DateTime;
}

export interface UserIncentiveMutationResponse {
    statusCode: number;
    data?: boolean;
    error?: Error;
}

export interface UserIncentiveResponse {
    statusCode?: number;
    data?: UserIncentive[];
    error?: Error;
}

export interface UserStampsQueryResponse {
    statusCode?: number;
    data?: number;
    error?: Error;
}

export interface UserSummary {
    userStampCount: number;
    userIncentiveCount: number;
}

export type DateTime = any;
export type JSON = any;
export type Upload = any;
