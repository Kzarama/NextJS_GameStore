import { AuthInterface } from "../interfaces/iAuth";

import { createContext } from "react";

const AuthContext = createContext<AuthInterface>({
  auth: { id: "" },
  login: (token: string) => { },
  logout: () => { },
  setReloadUser: () => { },
});

export default AuthContext;
