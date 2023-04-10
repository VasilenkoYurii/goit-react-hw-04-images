import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  HeaderSearchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    request: '',
  };

  setSearchValue = e => {
    this.setState({ request: e.target.value });
  };

  submit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.request);
  }

  render() {
    return (
      <HeaderSearchbar>
        <SearchForm
          onSubmit={e => {
            this.submit(e);
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
            onChange={this.setSearchValue}
          />
        </SearchForm>
      </HeaderSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
