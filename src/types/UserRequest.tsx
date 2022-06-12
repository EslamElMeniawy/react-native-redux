import UserData from './UserData';

export interface UserRequestType {
  user?: UserData;
  delay?: number;
}

export default class UserRequest {
  params?: Record<string, any>;
  body?: UserData;

  constructor(data: UserRequestType) {
    if (data?.user) {
      this.body = data?.user;
    }

    if (data?.delay) {
      this.params = {
        delay: data?.delay,
      };
    }
  }
}
