import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {
  PhonebookForm,
  SubmitBtn,
  FormTitle,
} from './Form.styled';

const schema = Yup.object().shape({
  name: Yup.string().min(2).max(70).required('Name is required'),
  number: Yup.string().min(4).required('Number is required'),
});

const initialValues = {
  name: '',
  number: '',
};

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
    <PhonebookForm>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form autoComplete="off">
          <label htmlFor="name">
            <FormTitle>Name</FormTitle>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </label>
          <label htmlFor="number">
            <FormTitle>Number</FormTitle>
            <Field type="text" name="number" />
            <ErrorMessage name="number" component="div" className="error" />
          </label>
          <SubmitBtn type="submit">Add contact</SubmitBtn>
        </Form>
      </Formik>
    </PhonebookForm>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
