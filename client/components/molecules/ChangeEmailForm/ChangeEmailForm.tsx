import styles from "./ChangeEmailForm.module.scss";

import { updateEmailApi } from "../../../assets/api/user";
import { FormsInterface } from "../../../assets/interfaces/iForms";

import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";

export default function ChangeEmailForm(props: FormsInterface) {
  const { user, logout, setReloadUser } = props;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user!.email),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user!.id, formData.email, logout);
      if (response && !response.error) {
        setReloadUser(true);
        toast.success("Correo electrónico actualizado.");
        formik.handleReset(true);
      } else if (response.statusCode == 400) {
        toast.error("Error al actualizar el correo electrónico.");
      } else {
        toast.error("Error al actualizar el correo electrónico.");
      };
      setLoading(false);
    },
  });

  return (
    <div className={styles.change_email_form}>
      <h4>
        Cambia tu correo electrónico <span>(Tu correo electrónico actual es: {user!.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Tu nuevo correo electrónico"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Repite tu nuevo correo electrónico"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>Actualizar</Button>
      </Form>
    </div>
  );
};

function initialValues(email: string) {
  return {
    email: "",
    repeatEmail: "",
  };
};

function validationSchema() {
  return {
    email: Yup.string()
      .email()
      .required("El correo electrónicoes obligatorio.")
      .oneOf([Yup.ref("repeatEmail")], "Los correos no son iguales"),
    repeatEmail: Yup.string()
      .email()
      .required("El correo electrónicoes obligatorio.")
      .oneOf([Yup.ref("email")], "Los correos no son iguales"),
  };
};
