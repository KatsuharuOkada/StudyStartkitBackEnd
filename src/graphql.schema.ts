
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginDto {
    email: string;
    password: string;
}

export class CreatePhotoDto {
    url: string;
    comment?: Nullable<string>;
}

export class UpdatePhotoDto {
    comment?: Nullable<string>;
}

export class UpdateProjectDto {
    projectDescription: string;
    skills: Nullable<number>[];
}

export class CreateProjectDto {
    projectName: string;
    projectCode: string;
    projectDescription?: Nullable<string>;
    skills: Nullable<number>[];
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

    abstract register(RegisterDto: CreateUserDto): Nullable<RegisterResponse> | Promise<Nullable<RegisterResponse>>;

    abstract refreshToken(refreshToken: string): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;

    abstract addPhoto(params: CreatePhotoDto): Nullable<PhotoResponse> | Promise<Nullable<PhotoResponse>>;

    abstract updatePhoto(id: number, params: UpdatePhotoDto): Nullable<PhotoResponse> | Promise<Nullable<PhotoResponse>>;

    abstract deletePhoto(id: number): Nullable<BaseResponse> | Promise<Nullable<BaseResponse>>;

    abstract deleteProject(id: number): Nullable<BaseResponse> | Promise<Nullable<BaseResponse>>;

    abstract updateProject(id: number, params?: Nullable<UpdateProjectDto>): Nullable<ProjectResponse> | Promise<Nullable<ProjectResponse>>;

    abstract addProject(params?: Nullable<CreateProjectDto>): Nullable<ProjectResponse> | Promise<Nullable<ProjectResponse>>;

    abstract addSkill(params?: Nullable<CreateSkillDto>): Nullable<SkillResponse> | Promise<Nullable<SkillResponse>>;
}

export class AuthResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<AuthDto>;
    error?: Nullable<string>;
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

export abstract class IQuery {
    abstract getPhoto(id: number): Nullable<PhotoResponse> | Promise<Nullable<PhotoResponse>>;

    abstract getPhotos(Pager: Pager, FilterConditions?: Nullable<JSON>, OrderConditions?: Nullable<JSON>): Nullable<PhotosResponse> | Promise<Nullable<PhotosResponse>>;

    abstract getProjects(Pager: Pager, FilterConditions?: Nullable<JSON>, OrderConditions?: Nullable<JSON>): Nullable<ProjectsResponse> | Promise<Nullable<ProjectsResponse>>;

    abstract getProject(id: number): Nullable<ProjectResponse> | Promise<Nullable<ProjectResponse>>;

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

export class ProjectsResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<ProjectsData>;
    error?: Nullable<string>;
}

export class ProjectsData {
    data?: Nullable<Nullable<ProjectDto>[]>;
    paging?: Nullable<Paging>;
}

export class ProjectResponse {
    statusCode: number;
    message?: Nullable<string>;
    data?: Nullable<ProjectDto>;
    error?: Nullable<string>;
}

export class ProjectDto {
    id?: Nullable<number>;
    projectName?: Nullable<string>;
    projectCode?: Nullable<string>;
    projectDescription?: Nullable<string>;
    skills?: Nullable<Nullable<SkillsDto>[]>;
}

export class SkillsDto {
    id: number;
    skillName: string;
    language?: Nullable<string>;
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
    id?: Nullable<number>;
    userName?: Nullable<string>;
    email?: Nullable<string>;
    gender?: Nullable<string>;
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
