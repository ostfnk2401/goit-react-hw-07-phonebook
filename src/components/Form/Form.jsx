import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { PhonebookForm, SubmitBtn, FormTitle } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { Notify } from 'notiflix';
import { addContactsThunk } from 'redux/operations';

const schema = Yup.object().shape({
  name: Yup.string().min(2).max(70).required('Name is required'),
  number: Yup.string().min(4).required('Number is required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existingContact) {
      Notify.warning(`${newContact.name} is already in contact`);
      return;
    }
    dispatch(addContactsThunk(newContact));
    resetForm();
  };

  return (
    <PhonebookForm>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
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
