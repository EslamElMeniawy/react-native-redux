import UserData from './UserData';

interface UserRequest {
  params?: Record<string, any>;
  body?: UserData;
}

export default UserRequest;
