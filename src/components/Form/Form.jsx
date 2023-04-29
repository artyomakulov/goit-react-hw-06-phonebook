import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/slice';

import css from './Form.module.css';

function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const searchName = contacts
      .map(contactName => contactName.name.toLowerCase())
      .includes(name.toLowerCase());
    if (searchName) {
      alert(`${name} is already in contact`);
      return;
    } else {
      const contact = {
        name,
        number,
        id: nanoid(),
      };
      dispatch(addContact(contact));
      reset();
    }
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameId = nanoid();
  const telId = nanoid();

  return (
    <form onSubmit={handleSubmit} className={css.formSection}>
      <label htmlFor={nameId}>
        Name{' '}
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameId}
          className={css.input}
        />
      </label>
      <label htmlFor={telId}>
        Number{' '}
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={telId}
          className={css.input}
        />
      </label>
      <button type="submit" disabled={name === '' || number === ''}>
        Add contact
      </button>
    </form>
  );
}

export default Form;
