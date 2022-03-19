import { UserDataInterface } from "./iUserData";

export interface FormsInterface {
  user: UserDataInterface | null;
  logout: Function;
  setReloadUser: Function;
};
