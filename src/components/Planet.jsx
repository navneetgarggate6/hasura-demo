import { gql, useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import InputForm from "./shared/InputForm";
import { List, ListItem } from "./shared/List";
import { Tag } from "./shared/Tag";

const PLANET = gql`
  subscription Planet($id: Int!) {
    planets_by_pk(id: $id) {
      id
      name
      color
      properties(order_by: { id: asc }) {
        id
        name
      }
    }
  }
`;

const ADD_PROPERTY = gql`
  mutation InsertProperties($name: String!, $planet_id: Int!) {
    insert_properties_one(object: {name: $name, planet_id: $planet_id}) {
      id
    }
  }
`;

const Planet = ({ match }) => {
  const id = match.params.id;

  const [inputValue, setInputValue] = useState();
  const { loading, error, data } = useSubscription(PLANET, { variables: { id } });
  const [addProperty] = useMutation(ADD_PROPERTY);

  if (loading) return <div>loading</div>;
  if (error) return <div>{error}</div>;

  const { name, color, properties } = data.planets_by_pk;

  return (
    <List>
      <h2>
        {name}
        <Tag>{color}</Tag>
      </h2>

      <InputForm
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          addProperty({ variables: { name: inputValue, planet_id: id } })
            .then(() => setInputValue(""))
            .catch((e) => setInputValue(e.message));
        }}
        buttonText="Submit"
      />

      <List>
        {properties.map((properties) => (
          <ListItem key={properties.id}>{properties.name}</ListItem>
        ))}
      </List>
    </List>
  );
};

export default Planet;
