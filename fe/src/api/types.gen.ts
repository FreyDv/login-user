// This file is auto-generated by @hey-api/openapi-ts

export type RegisterDto = {
    /**
     * User Email
     */
    email: string;
    /**
     * User Password
     */
    password: string;
    /**
     * User Name
     */
    name: string;
    /**
     * User Second Name
     */
    secondName?: string;
    /**
     * User BirthDate
     */
    birthDate?: string;
};

export type AuthResultDto = {
    /**
     * User Token to access api
     */
    accessToken: string;
};

export type LoginDto = {
    /**
     * User Email
     */
    email: string;
    /**
     * User Password
     */
    password: string;
};

export type FindByIdUserResultDto = {
    /**
     * User Email
     */
    email: string;
    /**
     * User Name
     */
    name: string;
    /**
     * User Second Name
     */
    secondName?: string;
    /**
     * User BirthDate
     */
    birthDate?: string;
    /**
     * User Id
     */
    id: string;
};

export type UpdateUserDto = {
    /**
     * User Email
     */
    email?: string;
    /**
     * User Name
     */
    name?: string;
    /**
     * User Second Name
     */
    secondName?: string;
    /**
     * User BirthDate
     */
    birthDate?: string;
};

export type UpdateUserResultDto = {
    /**
     * User Email
     */
    email: string;
    /**
     * User Name
     */
    name: string;
    /**
     * User Second Name
     */
    secondName?: string;
    /**
     * User BirthDate
     */
    birthDate?: string;
    /**
     * User Id
     */
    id: string;
};

export type DeleteUserResultDto = {
    /**
     * Deleting result
     */
    success: boolean;
};

export type AppControllerGetHelloResponse = (unknown);

export type AppControllerGetHelloError = unknown;

export type AuthControllerRegisterData = {
    body: RegisterDto;
};

export type AuthControllerRegisterResponse = (AuthResultDto);

export type AuthControllerRegisterError = unknown;

export type AuthControllerLoginData = {
    body: LoginDto;
};

export type AuthControllerLoginResponse = (AuthResultDto);

export type AuthControllerLoginError = unknown;

export type UserControllerFindOneData = {
    path: {
        id: string;
    };
};

export type UserControllerFindOneResponse = (FindByIdUserResultDto);

export type UserControllerFindOneError = unknown;

export type UserControllerUpdateData = {
    body: UpdateUserDto;
    path: {
        id: string;
    };
};

export type UserControllerUpdateResponse = (UpdateUserResultDto);

export type UserControllerUpdateError = unknown;

export type UserControllerRemoveData = {
    path: {
        id: string;
    };
};

export type UserControllerRemoveResponse = (DeleteUserResultDto);

export type UserControllerRemoveError = unknown;