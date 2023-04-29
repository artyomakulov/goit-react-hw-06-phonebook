import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filter/slice';

export default function Filter() {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <label>
      <h3>Filter by name </h3>
      <input onChange={changeFilter} type="text" name="filter" value={filter} />
    </label>
  );
}
