import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { url, options } from "./api";

const loadOptions = (inputValue) => {
  return fetch(`${url}?minPopulation=1000000&namePrefix=${inputValue}`, options)
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name} (${city.countryCode})`,
          };
        }),
      };
    });
};

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    ></AsyncPaginate>
  );
};
export default Search;
