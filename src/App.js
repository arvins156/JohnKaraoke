import './App.css';
import { useState, useEffect } from 'react';

const LyricBody = () => {
  return (
    <div>
      
    </div>
  )
} //Lyric body

const InputBox = ({input, handleInputChange}) => {
  return (
    <div>
      <input
        type = "text"
        placeholder = "Enter Spotify URL"
        value = {input}
        onChange = {handleInputChange}
        autofocus
      />
    </div>
  )
} //Input box

const SearchButton = ({onClick}) => {
  return (
    <button onClick={onClick}>
      Search
    </button>
  )
}

const PlayButton = ({onClick}) => {
  return (
    <button onClick={onClick}>
      Play
    </button>
  )
}

const PauseButton = ({onClick}) => {
  return (
    <button onClick={onClick}>
      Pause
    </button>
  )
}

function App() {
  const [time, setTime] = useState(0); 
  const [startTime, setStartTime] = useState(null); 
  const [input, setInput] = useState("");

  useEffect(() => {
    let interval;
    setStartTime(Date.now());
    interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime; 
      setTime(elapsedTime / 1000); 
    }, 100); 
    return () => clearInterval(interval);
  }, [startTime]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  const handleSearch = () => {

  }

  const handlePlay = () => {

  }

  const handlePause = () => {

  }

  return (
    <div>
      <h1>help</h1>
      <InputBox
        input = {input}
        handleInputChange={handleInputChange}
      />
      <SearchButton
        onClick={handleSearch}
      />
      <PlayButton
        onClick={handlePlay}
      />
      <PauseButton
        onClick={handlePause}
      />
    </div>
  );
}

export default App;
