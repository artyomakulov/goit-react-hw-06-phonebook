import Form from './components/Form/Form';
import ContactList from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';

import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from './redux/contacts/slice';
import { setFilter } from './redux/filter/slice';

function App() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

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
      <Form />
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
