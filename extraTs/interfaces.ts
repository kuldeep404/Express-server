export interface IPermissions {
    getUsers: {
        [index: string]: string[];
    };
}
export interface IUser {
    reviewerEmail: string;
    traineeEmail: string;
}
