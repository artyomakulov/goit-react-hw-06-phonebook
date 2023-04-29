import React from 'react';
import css from './Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/slice';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <ol className={css.ContactList}>
      {visibleContacts.map(({ id, name, number }) => {
        return (
          <li className={css.ContactList_item} key={id}>
            <p>
              {name}: {number}
            </p>
            <button
              className={css.ContactList_btn}
              onClick={() => handleDeleteContact(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ol>
  );
}
