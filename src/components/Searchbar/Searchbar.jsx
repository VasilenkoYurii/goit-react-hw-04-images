import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  HeaderSearchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const setSearchValue = e => {
    setRequest(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    onSubmit(request);
  };

  return (
    <HeaderSearchbar>
      <SearchForm
        onSubmit={e => {
          submit(e);
        }}
      >
        <SearchFormButton type="submit">
          <BsSearch className="search-icon" />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={setSearchValue}
        />
      </SearchForm>
    </HeaderSearchbar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
