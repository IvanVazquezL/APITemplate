## SQL
* npm init -y
* npm i express
* npm i nodemon
* npm i pg
* npm i cors
* npm i dotenv
* 
## Mongo
* npm init -y
* npm i express
* npm i nodemon
* add .env
* add .gitignore
* add index.js
* npm i dotenv
* npm i cors
* npm i mongoose

## Quotes

#### POST - Create Quote 

*`http://localhost:PORT/api/quotes/`*

Body

```json
{
    "language": "EN",
    "chapter": "1",
    "quote": "In the course of this life I have had a great many encounters with a great many people who have been concerned with matters of consequence. I have lived a great deal among grown-ups. I have seen them intimately, close at hand. And that hasn't much improved my opinion of them"
}
```

#### GET - Get Quotes
Gets all the english quotes by default
*`http://localhost:PORT/api/quotes`*


Gets all the spanish quotes from chapter 0 (Dedication)
*`http://localhost:PORT/api/quotes/?lang=ES&chapter=0`*

#### DELETE - Delete Quote
*`http://localhost:PORT/api/quotes/:id
`*

#### PUT - Update Quote
*`http://localhost:PORT/api/quotes/:id`*

Body
```json
{
    "quote": "Todos los adultos alguna vez fueron niños (aunque pocos de ellos lo recuerdan)"
}
```

