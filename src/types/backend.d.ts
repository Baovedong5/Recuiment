export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    address: string;
    role?: {
      _id: string;
      name: string;
    };
    company?: {
      _id: string;
      name: string;
    };
    createdBy?: string;
    deletedAt?: boolean | string | null;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  interface IAccount {
    access_token: string;
    user: {
      _id: string;
      email: string;
      name: string;
      role: {
        _id: string;
        name: string;
      };
      permissions: {
        _id: string;
        name: string;
        apiPath: string;
        method: string;
        module: string;
      }[];
    };
  }

  interface IGetAccount extends Omit<IAccount, "access_token"> {}
}
