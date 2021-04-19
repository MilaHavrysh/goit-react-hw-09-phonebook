import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { Submit } from '../../redux/contacts/contacts-operations';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    validName: false,
    validNum: false,
  });

  const dispatch = useDispatch();

  const addContactName = e => {
    const { name, number, validName, validNum } = form;

    const newName = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    if (name && number !== '' && validName && validNum) {
      dispatch(Submit(newName));
      setForm({
        ...form,
        name: '',
        number: '',
      });
    }
  };

  const inputChange = e => {
    if (e.target.attributes.id.nodeValue === 'formBasicName') {
      setForm({
        ...form,
        name: e.target.value,
        validName: e.target.validity.valid,
      });
    } else if (e.target.attributes.id.nodeValue === 'formBasicNumber') {
      setForm({
        ...form,
        number: e.target.value,
        validNum: e.target.validity.valid,
      });
    }
  };
  return (
    <Form>
      <FormGroup controlId="formBasicName">
        <Form.Label>name</Form.Label>
        <Form.Control
          className={styles.contact_form_input}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          autoComplete="off"
          onChange={inputChange}
          value={form.name}
          placeholder=" "
        />
      </FormGroup>
      <FormGroup controlId="formBasicNumber">
        <Form.Label>number</Form.Label>
        <Form.Control
          className={styles.contact_form_input}
          type="tel"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
          autoComplete="off"
          onChange={inputChange}
          value={form.number}
          placeholder=" "
        />
      </FormGroup>
      <Button variant="primary" type="button" onClick={addContactName}>
        Add contact
      </Button>
    </Form>
  );
};

export default ContactForm;
