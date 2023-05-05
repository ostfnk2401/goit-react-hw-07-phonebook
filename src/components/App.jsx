import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = data => {
    const nanoid = customAlphabet('1234567890', 3);
    const id = 'id-' + nanoid();
    data = { id, ...data };
    console.log(data);
    this.setState(({ contacts }) =>
      contacts.find(contact => contact.name === data.name)
        ? Notify.warning(`${data.name} is already in contact`)
        : { contacts: [data, ...contacts] }
    );
  };

  handleFilter = evt => {
    const { value } = evt.currentTarget;
    this.setState({ filter: value });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.handleFilteredContacts(contacts);

    return (
      <PhoneBook>
        <ContactForm onSubmit={this.handleSubmit}></ContactForm>
        <ContactsWrapper>
          <ContactsTitle>Contacts</ContactsTitle>
          <Filter value={filter} onFilter={this.handleFilter} />
          <Contacts
            contacts={filteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </ContactsWrapper>
      </PhoneBook>
    );
  }
}