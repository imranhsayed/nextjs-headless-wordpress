import SearchForm from './search-form';
import {useState} from 'react';
import Router from 'next/router';

const NavSearch = () => {

  const [ searchQuery, setSearchQuery ] = useState( '' );

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    Router.push( `/search?s=${searchQuery}` );
    return null;
  }

  return (
    <div className="mt-4 md:mt-0">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />
    </div>
  )
}

export default NavSearch
