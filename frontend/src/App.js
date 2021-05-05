/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.scss';

function App() {
  const [Romain, setRomain] = useState('');
  const [listening, setListening] = useState(false);
  const [number, setNumber] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/GetRomainNumber');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
        setRomain(parsedData);
      };

      setListening(true);
    }
  }, [listening, Romain]);

  return (
    <>
      <div className={open ? 'Number open' : 'Number '}>
        <input
          type="number"
          value={number}
          className={open ? 'Number-box open' : 'Number-box '}
          onChange={(event) => {
            if (event.target.value <= 100) setNumber(event.target.value);
          }}
        />
        <span
          className={open ? 'Number-button open' : 'Number-button '}
          onClick={() => {
            if (!open) setOpen(true);
            else {
              axios
                .post('http://localhost:3001/ConvertNumber', { number })
                .then((result) => {
                  console.log(result);
                })
                .catch((error) => {
                  console.log(error);
                  setRomain('Problème serveur');
                });
            }
          }}
        >
          <span className="Number-icon" />
        </span>
      </div>
      <div className="Div">
        {Romain !== '' && (
          <h1 className="Text">{Romain === 'Problème serveur' ? Romain : `Romain : ${Romain}`}</h1>
        )}
      </div>
    </>
  );
}

export default App;
