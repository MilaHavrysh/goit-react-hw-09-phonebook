import { SetFilter } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import styles from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <>
      <Form.Control
        className={styles.fiter_input}
        type="text"
        name="filter"
        autoComplete="off"
        onChange={e => dispatch(SetFilter(e.target.value))}
        value={filter}
      />
    </>
  );
};

export default Filter;
