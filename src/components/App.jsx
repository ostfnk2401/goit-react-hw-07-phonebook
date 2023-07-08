import React, { useState, useEffect } from 'react';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix';
import {
  PhoneBook,
  ContactsTitle,
  ContactsWrapper,
} from 'components/App.styled';
import { customAlphabet } from 'nanoid';
const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || initialState
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = data => {
    const nanoid = customAlphabet('1234567890', 3);

    const existingContact = contacts.find(
      contact => contact.name === data.name
    );
    if (existingContact) {
      Notify.warning(`${data.name} is already in contact`);
      return;
    }

    setContacts(prevState => [...prevState, { ...data, id: 'id-' + nanoid() }]);
  };

  const handleFilter = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = handleFilteredContacts(contacts);

  return (
    <PhoneBook>
      <ContactForm onSubmit={handleSubmit}></ContactForm>
      <ContactsWrapper>
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter value={filter} onFilter={handleFilter} />
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </ContactsWrapper>
    </PhoneBook>
  );
};
