/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import debounce from "lodash.debounce";
import { gql, useQuery } from "@apollo/client";
import "./Search.scss";
import { Input, Label } from "semantic-ui-react";

interface SearchProps {
  addToWatchList: (country: Country) => void;
  setAmountToConvert: (amount: number) => void;
  setCountries: (countries: Country[]) => void;
  countries: Country[];
}

type CountryName = {
  common: string;
  official: string;
};

type Currency = {
  abbr: string;
  name: string;
  exchangeRate: number;
  symbol?: string;
};

export type Country = {
  name: CountryName;
  population: number;
  currencies: Currency[];
};

const CountrySearch: FunctionComponent<SearchProps> = (props) => {
  const [searchText, setSearchText] = useState("");

  const onChange = (searchStr: any) => {
    console.log({searchStr});
    setSearchText(searchStr);
    if (searchStr === "") {
      props.setCountries([]);
    }
  };
  const debouncedOnChange = debounce(onChange, 500);

  const SEARCH_COUNTRIES = gql`
    query ($searchText: String!) {
      searchCountries(searchText: $searchText) {
        name {
          common
          official
        }
        population
        currencies {
          abbr
          exchangeRate
          name
          symbol
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(SEARCH_COUNTRIES, {
    variables: { searchText },
    skip: searchText === "",
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    data && props.setCountries(data.searchCountries);
  }, [data, error, props]);

  function handleChange(searchValue: string) {
    debouncedOnChange(searchValue);
  }

  return (
    <div
      style={{
        position: "relative",
        borderRight: 1,
        border: "0 1px 0 0 solid black",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Input
        loading={loading}
        icon="search"
        placeholder="Search for a country"
        onChange={(e) => handleChange(e.target.value)}
        size="large"
      />
      <div style={{width: '100px'}} />
      <Input
        placeholder="Amount to convert"
        onChange={(e) => props.setAmountToConvert(parseInt(e.target.value || "1"))}
        size="large"
        label={<Label>SEK</Label>}
      />
      {/* <div style={{width: '100px'}} />
      <Search
        loading={loading}
        fluid
        onSearchChange={(e, data) => onChange(data.value || "")}
        results={props.countries.map((country, idx) => (<h4 key={idx}>{country.name.common}</h4>))}
        defaultValue={""}
      /> */}
    </div>
  );
};

export default CountrySearch;
