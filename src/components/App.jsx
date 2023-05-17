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

 export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = data => {
    const nanoid = customAlphabet('1234567890', 3);
    const id = 'id-' + nanoid();
    data = { id, ...data };
    console.log(data);

    const existingContact = contacts.find(contact => contact.name === data.name);
    if (existingContact) {
      Notify.warning(`${data.name} is already in contact`);
    } else {
      const updatedContacts = [data, ...contacts];
      setContacts(updatedContacts);
    }
  };

  const handleFilter = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const handleDeleteContact = contactId => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
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
