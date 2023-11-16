
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginDto {
    loginId: string;
    password: string;
}

export class ActiveAccountDto {
    email: string;
}

export class ResetPasswordDto {
    resetPasswordToken: string;
    newPassword: string;
}

export class VerifyCodeDto {
    verificationToken?: Nullable<string>;
    verificationCode?: Nullable<string>;
}

export class RefreshTokenDto {
    refreshToken: string;
}

export class CreatePhotoDto {
    url: string;
    comment?: Nullable<string>;
}

export class UpdatePhotoDto {
    comment?: Nullable<string>;
}

export class CreateSkillDto {
    skillName: string;
    language: string;
}

export class CreateUserDto {
    email?: Nullable<string>;
    password?: Nullable<string>;
    gender?: Nullable<string>;
    userName?: Nullable<string>;
}

export class Pager {
    limit: number;
    offset?: Nullable<number>;
    page?: Nullable<number>;
    isTakeAll?: Nullable<boolean>;
}

export abstract class IMutation {
    abstract login(params: LoginDto): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;

    abstract logout(): Nullable<BaseResponse> | Promise<Nullable<BaseResponse>>;

    abstract register(RegisterDto: CreateUserDto): Nullable<RegisterResponse> | Promise<Nullable<RegisterResponse>>;

    abstract refreshToken(params: RefreshTokenDto): Nullable<RefreshTokenResponse> | Promise<Nullable<RefreshTokenResponse>>;

    abstract activeAccount(params: ActiveAccountDto): Nullable<ActiveAccountResponse> | Promise<Nullable<ActiveAccountResponse>>;

    abstract verifyCode(params?: Nullable<VerifyCodeDto>): Nullable<VerifyCodeResponse> | Promise<Nullable<VerifyCodeResponse>>;

    abstract resetPassword(params: ResetPasswordDto): Nullable<BaseResponse> | Promise<Nullable<BaseResponse>>;

    abstract addPhoto(params: CreatePhotoDto): Nullable<PhotoResponse> | Promise<Nullable<PhotoResponse>>;

    abstract updatePhoto(id: number, params: UpdatePhotoDto): Nullable<PhotoResponse> | Promise<Nullable<PhotoResponse>>;

    abstract deletePhoto(id: number): Nullable<BaseResponse> | Promise<Nullable<BaseResponse>>;

    abstract addSkill(params?: Nullable<CreateSkillDto>): Nullable<SkillResponse> | Promise<Nullable<SkillResponse>>;
}

export class AuthResponse {
    statusCode: number;
    data?: Nullable<AuthDto>;
    error?: Nullable<Error>;
}

export class RegisterResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<UserDto>;
    error?: Nullable<string>;
}

export class AuthData {
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
    expired?: Nullable<string>;
    tokenType?: Nullable<string>;
}

export class AuthDto {
    auth?: Nullable<AuthData>;
    user?: Nullable<UserDto>;
}

export class ActiveAccountResponse {
    statusCode: number;
    data?: Nullable<VerificationTokenDto>;
    error?: Nullable<Error>;
}

export class VerificationTokenDto {
    verificationToken?: Nullable<string>;
}

export class VerifyCodeResponse {
    statusCode: number;
    data?: Nullable<SetPaswordTokenDto>;
    error?: Nullable<Error>;
}

export class SetPaswordTokenDto {
    setPasswordToken?: Nullable<string>;
}

export class RefreshTokenResponse {
    statusCode: number;
    data?: Nullable<AuthData>;
    error?: Nullable<Error>;
}

export class CityDto {
    cityId?: Nullable<number>;
    cityName?: Nullable<string>;
    postCode?: Nullable<string>;
    region?: Nullable<RegionDto>;
}

export abstract class IQuery {
    abstract getPhoto(id: number): Nullable<PhotoResponse> | Promise<Nullable<PhotoResponse>>;

    abstract getPhotos(Pager: Pager, FilterConditions?: Nullable<JSON>, OrderConditions?: Nullable<JSON>): Nullable<PhotosResponse> | Promise<Nullable<PhotosResponse>>;

    abstract getProjects(Pager: Pager, FilterConditions?: Nullable<JSON>, OrderConditions?: Nullable<JSON>): Nullable<ProjectsListResponse> | Promise<Nullable<ProjectsListResponse>>;

    abstract getSkills(Pager: Pager, FilterConditions?: Nullable<JSON>, OrderConditions?: Nullable<JSON>): Nullable<SkillsResponse> | Promise<Nullable<SkillsResponse>>;

    abstract user(): Nullable<UserInfoResponse> | Promise<Nullable<UserInfoResponse>>;

    abstract users(Pager: Pager, FilterConditions?: Nullable<JSON>, OrderConditions?: Nullable<JSON>): Nullable<UsersResponse> | Promise<Nullable<UsersResponse>>;
}

export class PhotoComment {
    id?: Nullable<number>;
    comment?: Nullable<string>;
    owner?: Nullable<UserDto>;
}

export class PhotoDto {
    id?: Nullable<number>;
    url?: Nullable<string>;
    comment?: Nullable<string>;
    owner?: Nullable<UserDto>;
    comments?: Nullable<Nullable<PhotoComment>[]>;
}

export class PhotoResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<PhotoDto>;
    error?: Nullable<string>;
}

export class PhotosResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<PhotosData>;
    error?: Nullable<string>;
}

export class PhotosData {
    data?: Nullable<Nullable<PhotoDto>[]>;
    paging?: Nullable<Paging>;
}

export class ProjectsListResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<ProjectsListData>;
    error?: Nullable<string>;
}

export class ProjectsListData {
    data?: Nullable<Nullable<ProjectsListDto>[]>;
    paging?: Nullable<Paging>;
}

export class ProjectsListDto {
    projectName?: Nullable<string>;
    projectDescription?: Nullable<string>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    projectCode?: Nullable<string>;
    id?: Nullable<number>;
    skills?: Nullable<Nullable<SkillsDto>[]>;
}

export class SkillsDto {
    skillName?: Nullable<string>;
    language?: Nullable<string>;
}

export class RegionDto {
    regionId?: Nullable<number>;
    regionName?: Nullable<string>;
    postCode?: Nullable<string>;
}

export class SkillsResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<SkillsData>;
    error?: Nullable<string>;
}

export class SkillsData {
    data?: Nullable<Nullable<SkillDto>[]>;
    paging?: Nullable<Paging>;
}

export class SkillResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<SkillDto>;
    error?: Nullable<string>;
}

export class SkillDto {
    id: number;
    skillName: string;
    language?: Nullable<string>;
}

export class UserDto {
    id: number;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    nickName?: Nullable<string>;
    gender: string;
    birthDate?: Nullable<Date>;
    phoneNumber?: Nullable<string>;
    gatewayId?: Nullable<string>;
    city?: Nullable<CityDto>;
}

export class UserInfoResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<UserDto>;
    error?: Nullable<string>;
}

export class UsersResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<UsersData>;
    error?: Nullable<string>;
}

export class UsersData {
    data?: Nullable<Nullable<UserDto>[]>;
    paging?: Nullable<Paging>;
}

export class Error {
    errorCode: string;
    message?: Nullable<string>;
    details: Nullable<ErrorDetail>[];
}

export class ErrorDetail {
    message?: Nullable<string>;
    type?: Nullable<string>;
    key?: Nullable<string>;
    value?: Nullable<string>;
}

export class Paging {
    limit: number;
    offset: number;
    page: number;
    totalCount: number;
    isNext?: Nullable<boolean>;
    isPrev?: Nullable<boolean>;
    orders?: Nullable<JSON>;
    filters?: Nullable<JSON>;
}

export class BaseResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<BaseResult>;
    error?: Nullable<string>;
}

export class BaseResult {
    result?: Nullable<boolean>;
}

export type JSON = any;
type Nullable<T> = T | null;
