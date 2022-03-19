import styles from './ChangePasswordForm.module.scss';

import { updatePasswordApi } from '../../../assets/api/user';
import { ChangePasswordFormInterface } from '../../../assets/interfaces/iChangePasswordForm';

import * as Yup from "yup";
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';

export default function ChangePasswordForm(props: ChangePasswordFormInterface) {
  const { user, logout } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePasswordApi(user!.id, formData.password, logout);
      if (response && !response.error) {
        toast.success("Contraseña cambiada exitosamente");
      } else {
        toast.error("Error al cambiar la contraseña");
      };
      setLoading(false);
    },
  });

  return (
    <div className={styles.change_password_form}>
      <h4>Cambia tu contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            type="password"
            name="repeatPassword"
            placeholder="Confirma nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
};

function validationSchema() {
  return {
    password: Yup.string()
      .required()
      .oneOf([Yup.ref("repeatPassword")], "La contraseña es obligatoria"),
    repeatPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "La contraseña es obligatoria"),
  };
};
