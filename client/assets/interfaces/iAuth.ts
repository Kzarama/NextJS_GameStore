export interface AuthInterface {
  auth: { id: string };
  login: Function;
  logout: Function;
  setReloadUser: Function;
};
