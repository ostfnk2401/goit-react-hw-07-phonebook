import { useDispatch } from 'react-redux';
import { FilterCont, FilterTitle } from './Filter.styled';
import { addFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <FilterCont>
      <label htmlFor="filter">
        <FilterTitle>Find contacts by name</FilterTitle>
        <input
          name="filter"
          type="text"
          id="filter"
          onChange={event => dispatch(addFilter(event.target.value))}
        />
      </label>
    </FilterCont>
  );
};
