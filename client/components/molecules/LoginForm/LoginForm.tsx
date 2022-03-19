import styles from "./LoginForm.module.scss";

import useAuth from "../../../assets/hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../assets/api/user";

import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";

export default function LoginForm(props: { showRegisterForm: Function, setShowModal: Function }) {
  const { showRegisterForm, setShowModal } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        toast.success("Inicio de sesión exitoso!");
        setShowModal(false);
      } else {
        toast.error("El email o la contraseña son incorrectos.");
      };
      setLoading(false);
    },
  });

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required("El correo electrónico es obligatorio");
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: "El correo electrónico es obligatorio" });
    } else {
      resetPasswordApi(formik.values.identifier);
    };
  };

  return (
    <Form className={styles.login_form} onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <div>
          <Button className="submit" type="submit" loading={loading}>Entrar</Button>
          <Button
            type="button"
            className={styles.recovery_password}
            onClick={resetPassword}
          >
            ¿Has olvidado la contraseña
          </Button>
        </div>
        <Button className={styles.button_register} onClick={() => showRegisterForm(true)}>
          Registrarse
        </Button>
      </div >
    </Form >
  );
};

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
};

function validationSchema() {
  return {
    identifier: Yup.string().email().required("El email es obligatorio"),
    password: Yup.string().required("El password es obligatorio"),
  };
};
