export type User = {
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
};

export type Roles = 0 | 1 | 2;
