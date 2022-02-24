import React, { useState } from "react";
import {
  Card,
  Container,
  Header,
} from "semantic-ui-react";
import CountryList from "../../components/CountryList";
import CountrySearch, { Country } from "../../components/Search";

function roundToTwo(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function Dashboard() {
  const [watchList, setWatchList] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [amountToConvert, setAmountToConvert] = useState(1);

  function addToWatchList(country: Country) {
    if (watchList.find((c) => c.name.common === country.name.common)) {
      return;
    }
    setWatchList([...watchList, country]);
  }

  const COLUMNS = 4;
  const cards = watchList.map((country, idx) => (
    <Card key={`${country.name.common}${idx}`}>
      <Card.Content>
        <Card.Header>{country.name.common}</Card.Header>
        <Card.Meta>{country.name.official}</Card.Meta>
        <Card.Description textAlign="left">
          <ul>
            <li>Population: {country.population}</li>
            <li>
              Currencies:{" "}
              {country.currencies.map((c) => `${c.name} (${c.abbr})`).join(",")}
            </li>
            <li>
              Exchange Rate:{" "}
              {country.currencies
                .map((c) => `1 SEK = ${c.symbol}${roundToTwo(c.exchangeRate)}`)
                .join(",")}
            </li>
          </ul>
        </Card.Description>
        <Card.Description>
          <h4>Conversion: {country.currencies[0].symbol}{" "}
          {roundToTwo(
            amountToConvert * country.currencies[0]?.exchangeRate || 1
          )}{` (${country.currencies[0].abbr})`}</h4>
        </Card.Description>
      </Card.Content>
    </Card>
  ));
  return (
    <div style={{ padding: 20 }}>
      <Header>
        <Header.Content>Countries</Header.Content>
        <Header.Subheader>Search and add to your list</Header.Subheader>
        <CountrySearch
          countries={countries}
          addToWatchList={addToWatchList}
          setCountries={setCountries}
          setAmountToConvert={setAmountToConvert}
        />
        {!!countries.length && (
          <div
            style={{
              // height: "100%",
              // overflow: "auto",
              position: "absolute",
              background: "white",
              padding: 13,
              width: 320,
            }}
          >
            <CountryList
              countries={countries}
              addToWatchList={addToWatchList}
            />
          </div>
        )}
      </Header>
      <Container>
        <Card.Group itemsPerRow={COLUMNS}>{cards}</Card.Group>
      </Container>
    </div>
  );
}

export default Dashboard;
