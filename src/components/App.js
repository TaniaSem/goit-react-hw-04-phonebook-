import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Box } from './Box.styled';
import { Section } from './Section/Section';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? initialState
  );
  const [filter, setFilter] = useState('');

  const onFormSubmit = newContact => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      // console.log('error');
      return alert(newContact.name + ' is already in contacts!');
    }

    const contact = {
      id: nanoid(),
      name: newContact.name,
      number: newContact.number,
    };
    setContacts(prevState => [...prevState, contact]);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <Box>
      <Section title="Phonebook">
        <ContactForm onSubmit={onFormSubmit} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </Box>
  );
};
