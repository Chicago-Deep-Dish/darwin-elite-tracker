import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Footer() {
  const [quotes, setQuotes] = useState([]);

  const getInpsirationalQuote = () => {
    axios.get('/quotes')
      .then((results) => {
        console.log('helooooo', results)
        setQuotes(results.data)
        console.log('quotes', quotes)
      })
      .catch(err => console.log('error fetching quotes', err));
  }

  const goToLink = (link) => {
    const newWindow = newWindow.open(link, '_blank', 'noopener', 'noreferrer')
    if (newWindow) newWindow.opener = null;
  }
  let wordOfTheDay = quotes[(Math.floor(Math.random * quotes.length))];

  useEffect(getInpsirationalQuote, [quotes])
  return (
    <footer style={{width: '100%', backgroundColor: '#272727', marginBottom: 0, position: 'absolute'}}>
      <div>
      <blockquote>{wordOfTheDay}</blockquote>
      <footer>{wordOfTheDay}</footer>
      </div>

      <a style={{textDecoration: 'none'}} target='_blank' href='https://www.techinterviewhandbook.org/coding-interview-study-plan/'>Coding Interview Study Plan</a>
      {/* <p
        onClick={() => goToLink('https://www.techinterviewhandbook.org/coding-interview-study-plan/')}
      >
        Coding Interview Study Plan
      </p> */}
      <p>&#169; Darwin Enterprises&trade; 2022</p>
    </footer>
  );
}