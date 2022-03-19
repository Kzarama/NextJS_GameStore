import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

import { useState } from "react";

export default function Auth(props: { setShowModal: Function, setTitleModal: Function }) {
  const { setShowModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
    setTitleModal("Iniciar Sesión");
  };

  const showRegisterForm = () => {
    setShowLogin(false);
    setTitleModal("Crear nuevo usuario");
  };

  return (
    showLogin ? (
      <LoginForm showRegisterForm={showRegisterForm} setShowModal={setShowModal} />
    ) : (
      <RegisterForm showLoginForm={showLoginForm} />
    )
  );
};
