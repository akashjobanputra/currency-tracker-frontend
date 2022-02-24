import React from 'react'
import { List } from 'semantic-ui-react'
import { Country } from './Search';

interface CountryListProps {
  addToWatchList: (country: Country) => void;
  countries: Country[];
}

const CountryList = (props: CountryListProps) => (
  <List divided relaxed>
    {props.countries.map((country, idx) => (
      <List.Item key={`${country.name.common}${idx}`} onClick={() => props.addToWatchList(country)}>
        <List.Content>
          <List.Header as='a'>{country.name.common}</List.Header>
          <List.Description as='a'>{country.name.official}</List.Description>
        </List.Content>
      </List.Item>
    ))}
  </List>
)

export default CountryList;