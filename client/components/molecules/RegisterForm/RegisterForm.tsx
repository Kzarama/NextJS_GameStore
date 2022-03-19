import { registerApi } from "../../../assets/api/user";

import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";

export default function RegisterForm(props: { showLoginForm: Function }) {
  const { showLoginForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerApi(formData);
      if (response?.jwt) {
        showLoginForm();
        toast.success("Registro exitoso!");
      } else {
        toast.error("Error al registrar el usuario, intentelo más tarde.")
      };
      setLoading(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellido"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
        <Button type="button" basic onClick={() => showLoginForm(true)}>
          Iniciar sesión
        </Button>
      </div>
    </Form>
  );
};

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
};

function validationSchema() {
  return {
    name: Yup.string().required("El nombre es obligatorio."),
    lastname: Yup.string().required("El apellido es obligatorio."),
    username: Yup.string().required("El nombre de usuario es obligatorio."),
    email: Yup.string().email().required("El email es obligatorio."),
    password: Yup.string().required("La contraseña es obligatorio."),
  };
};
