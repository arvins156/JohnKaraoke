import './App.css';
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

const State = {
  NoSong : 'NO_SONG',
  NotStarted : 'NOT_STARTED',
  Playing : 'PLAYING',
  Paused : 'PAUSED',
  Finished : 'FINISHED',
};

const LyricBody = () => {
  return (
    <div>
      
    </div>
  )
} //Lyric body

const Timer = ({time, pauseTime}) => {
  return (
    <div>
      <h1>{time.seconds}</h1>
    </div>
  )
}  //Song timer

const ProgresBar = () => {
  return (
    <div>

    </div>
  )
} //Progress Bar for the Song
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
  const time = useStopwatch({ autoStart: false}) 
  const [input, setInput] = useState("");
  const [state, setState] = useState(State.NoSong);
  const [endTime, setEndTime] = useState(0);


  useEffect(() => {
    if (state === State.Playing) {
      time.start();
    } else if (state === State.Finished) {
      time.pause();
    } else if (state === State.Paused) {
      time.pause();
    } else if (state === State.NotStarted) {
      time.reset(0,false);
      setInput("");
    } 
    return;
  }, [state]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  const handleSearch = () => {
    setState(State.NotStarted);
  }

  const handlePlay = () => {
    setState(State.Playing);
  }

  const handlePause = () => {
    if (state === State.Playing) {
      setState(State.Paused);
    }
  }

  return (
    <div>
      <Timer
        time = {time}
        />
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
