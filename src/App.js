import './App.css';
import { useState, useEffect } from 'react';
import { useStopwatch } from "react-use-precision-timer";

const State = {
  NoSong : 'NO_SONG',
  NotStarted : 'NOT_STARTED',
  Playing : 'PLAYING',
  Paused : 'PAUSED',
  Finished : 'FINISHED',
};

const LyricBody = ({lyrics, time, nextTime, beforeText, currentText, afterText, nextPos}) => {
  //const {text1, text2, text3} = updateText(lyrics, time, nextTime, beforeText, currentText, afterText, nextPos);
  return (
    <div>
      
      
    </div>
  )
} //Lyric body

const Timer = ({time}) => {
  return (
    <div>
      <h1>{time.getElapsedRunningTime()}</h1>
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
  const time = useStopwatch();
  const [input, setInput] = useState("");
  const [state, setState] = useState(State.NoSong);
  const [updateTimer, setUpdateTimer] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [beforeText, setBeforeText] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [afterText, setAfterText] = useState("");

  useEffect(() => {
    let interval;
    if (state === State.Playing) {
      if (time.isStarted()){
        time.resume();
      } else {
        time.start();
      }
      interval = setInterval(() => {
        setUpdateTimer(updateTimer + 1);
      }, 1000);
    } else if (state === State.Finished) {
      clearInterval(interval)
      time.stop();
    } else if (state === State.Paused) {
      clearInterval(interval)
      time.pause();
    } else if (state === State.NotStarted) {
      clearInterval(interval)
      setUpdateTimer(0);
      time.start();
      time.pause();
      setInput("");
    } 
    return () => clearInterval(interval);
  }, [updateTimer, state]);

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
