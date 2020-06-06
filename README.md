# hasura-demo
simple react app with hasura


**INSTALLATION**

``npm install``

**START SERVER**

``npm start``


``localhost:3000``


**query**

```
query {
    planets {
        id
        name
        color 
    }
}
```
**mutation**

```
mutation InsertProperties($name: String!, $planet_id: Int!) {
    insert_properties_one(object: {
        name: $name, 
        planet_id: $planet_id
    }) {
        id
    }
  }
```
**subscription**

```
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
```
