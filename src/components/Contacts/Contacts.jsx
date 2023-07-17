import { useDispatch, useSelector } from 'react-redux';
import {
  ContactsList,
  ContactItem,
  Number,
  Name,
  DeleteBtn,
  P,
} from './Contacts.styled';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContactsThunk } from 'redux/operations';

export const Contacts = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = handleFilteredContacts();

  return (
    <ContactsList>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <ContactItem key={id}>
            <P>&#128100;</P>
            <Name>{name}:</Name>
            <Number>{number}</Number>
            <DeleteBtn
              type="button"
              onClick={() => dispatch(deleteContactsThunk(id))}
            >
              Delete
            </DeleteBtn>
          </ContactItem>
        );
      })}
    </ContactsList>
  );
};
