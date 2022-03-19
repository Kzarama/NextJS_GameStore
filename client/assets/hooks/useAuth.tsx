import AuthContext from "../context/AuthContext";

import { useContext } from "react";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => useContext(AuthContext);
