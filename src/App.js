import './App.css';
import { getLyrics } from './api.js';
import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(0); 
  const [startTime, setStartTime] = useState(null); 
  const [stateOfLines, setStateOfLines] = useState([]);
  useEffect(() => {
    let interval;
    setStartTime(Date.now());
    interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime; 
      setTime(elapsedTime / 1000); 
    }, 100); 
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    getLyrics()
    .then(lines => {
      setStateOfLines(lines);
    })
    .catch(error => console.error("Error fetching lyrics:", error));
  }, [])

  return (
    <div>
      <h1>{time.toFixed(2)}</h1>
    </div>
  );
}

export default App;
