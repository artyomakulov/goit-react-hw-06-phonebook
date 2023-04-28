import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form/Form';
import ContactList from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import css from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
      setContacts(prevState => [contact, ...prevState]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const narmalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(narmalizedFilter)
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
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
