// import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form/Form';
import ContactList from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';

import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from './redux/contacts/slice';
import { setFilter } from './redux/filter/slice';

function App() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (parsedContacts) {
  //     dispatch(addContact(parsedContacts));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const formSubmit = data => {
    console.log(data);
    const searchName = contacts
      .map(contactName => contactName.name.toLowerCase())
      .includes(data.name.toLowerCase());
    if (searchName) {
      alert(`${data.name} is already in contact`);
      return;
    } else {
      const contact = {
        ...data,
        id: nanoid(),
      };
      dispatch(addContact(contact));
    }
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

export default App;
