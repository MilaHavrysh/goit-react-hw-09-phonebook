import { useSelector, useDispatch } from 'react-redux';
import styles from './ContactList.module.css';
import {
  FetchContacts,
  DeleteContact,
} from '../../redux/contacts/contacts-operations';
import React, { useEffect } from 'react';
import {
  getVisibleContacts,
  getLoading,
} from '../../redux/contacts/contacts-selectors';
import { Button } from 'react-bootstrap';

const ContactList = () => {
  const items = useSelector(getVisibleContacts);
  const loading = useSelector(getLoading);
  const dispatch = useDispatch();

  useEffect(() => dispatch(FetchContacts()), []);

  return (
    <>
      {loading && <p>Loading...</p>}
      <ul className={styles.contactList}>
        {items.map(element => (
          <li key={element.id} className={styles.contact_list_item}>
            <p className={styles.contact_list_item_name}>{element.name}</p>
            <p className={styles.contact_list_item_number}>{element.number}</p>
            <Button
              className={styles.contact_list_item_button}
              variant="primary"
              type="button"
              onClick={() => dispatch(DeleteContact(element.id))}
            >
              delete
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
