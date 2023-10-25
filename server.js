const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); 
  });


  app.get('/api/quotes/random', (req, res, next) => {
   
    const randomQuote = getRandomElement(quotes)
    
    if (randomQuote) {
      res.send({
        quote: randomQuote
      });
    } else {
      res.status(404).send();
    }
  });

  app.get('/api/quotes', (req, res, next) => {
    const quotedPerson = req.query.person;
    const quotesByAuthor = quotes.filter(quote => quote.person === quotedPerson)

    if (quotedPerson) {
        res.send({
            quotes: quotesByAuthor
        })
    } else  {
        res.send({
            quotes: quotes
        })
    } 
  })

  app.post('/api/quotes', (req, res, next) => {
    const quote = req.query.quote;
    const person = req.query.person;
    const quoteObj = {
        quote: quote,
        person: person
    }

    if (quote && person) {
        quotes.push(quoteObj)
        res.send({
            quote: quoteObj
        })

    } else {
        res.status(400).send()
    }
  })