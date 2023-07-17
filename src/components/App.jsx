import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import {
  PhoneBook,
  ContactsTitle,
  ContactsWrapper,
} from 'components/App.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsThunk } from 'redux/operations';
import { selectError, selectLoading } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);
  return (
    <PhoneBook>
      <ContactForm />
      {isLoading && <p>loading...</p>}
      {error ? (
        <p>Error.{error}</p>
      ) : (
        <ContactsWrapper>
          <ContactsTitle>Contacts</ContactsTitle>
          <Filter />
          <Contacts />
        </ContactsWrapper>
      )}
    </PhoneBook>
  );
};
