export type UserTypes = {
  id: number;
  name: string;
  username: string;
  address: {
    street: string;
    suite: string;
    zipcode: string;
  };
  email: string;
};


export type PostTypes = {
  userId?: number;
  id?: number;
  title: string;
  body: string;
};

export interface FormErrors {
    title?: string;
    body?: string;
  }


export interface PageClickEvent {
    selected: number;
  }