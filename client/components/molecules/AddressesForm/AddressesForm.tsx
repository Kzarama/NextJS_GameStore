import useAuth from "../../../assets/hooks/useAuth";
import { AddressInterface } from "../../../assets/interfaces/iAddress";
import { createAddressApi, updateAddressesApi } from "../../../assets/api/address";

import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";

export default function AddressesForm(props: { setShowModal: Function, setReloadAddresses: Function, newAddress: boolean, address: AddressInterface }) {
  const { setShowModal, setReloadAddresses, newAddress, address } = props;

  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      if (newAddress) {
        createAddress(formData);
      } else {
        updateAddres(formData);
      };
    },
  });

  const createAddress = async (formData: AddressInterface) => {
    setLoading(true);
    const formDataTemp: AddressInterface = {
      ...formData,
      user: auth?.id,
    };
    const response = await createAddressApi(formDataTemp, logout);
    if (response.errors) {
      toast.warning("Error al crear la dirección.");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      toast.success("Dirección creada");
      setShowModal(false);
      setLoading(false);
    };
  };

  const updateAddres = async (formData: AddressInterface) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth?.id,
    };
    const response = await updateAddressesApi(address._id, formDataTemp, logout);
    if (!response) {
      toast.warning("Error al actualizar la dirección");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
    };
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Titulo de la dirección"
        placeholder="Titulo de la dirección"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellido"
          placeholder="Nombre y apellido"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Dirección"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado/Provincia/Región"
          placeholder="Estado/Provincia/Región"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Código postal"
          placeholder="Código postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Número de telefono"
          placeholder="Número de telefono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear dirección" : "Actualizar dirección"}
        </Button>
      </div>
    </Form>
  );
};

function initialValues(address: AddressInterface) {
  return {
    _id: "",
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
    user: "",
    createdAt: "",
  };
};

function validationSchema() {
  return {
    title: Yup.string().required("El titulo es obligatorio."),
    name: Yup.string().required("El nombre es obligatorio."),
    address: Yup.string().required("La dirección es obligatoria."),
    city: Yup.string().required("La ciudad es obligatoria."),
    state: Yup.string().required("Estado/Provincia/Región es requerido."),
    postalCode: Yup.string().required("El código postal es obligatorio-"),
    phone: Yup.string().required("El número de telefono es requerido"),
  };
};
