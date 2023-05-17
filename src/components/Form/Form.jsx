import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().min(2).max(70).required('Name is required'),
  number: Yup.number().min(4).required('Number is required'),
});

 export const ContactForm = ({ onSubmit }) => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    number: '',
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };
    onSubmit(newContact);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <label htmlFor="name">
          <div>Name</div>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className="error" />
        </label>
        <label htmlFor="number">
          <div>Number</div>
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="div" className="error" />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
