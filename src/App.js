import './App.css';
import { getLyrics } from './api.js';
import { useState, useEffect } from 'react';
import { useStopwatch } from "react-use-precision-timer";
import { updateText } from './utils';

var beforeText = "";
var currentText ="";
var afterText ="";
var nextTime = 0;
var nextPos = 1;
var stateOfLines =[];

const State = {
  NoSong : 'NO_SONG',
  NotStarted : 'NOT_STARTED',
  Playing : 'PLAYING',
  Paused : 'PAUSED',
  Finished : 'FINISHED',
};

const LyricBody = (time) => {
  const {text1, text2, text3, nTime, pos} = updateText(stateOfLines, time, nextTime, beforeText, currentText, afterText, nextPos);
  nextPos = pos;
  beforeText = text1;
  currentText = text2;
  afterText = text3;
  nextTime = nTime;
  return (
    <div>
      <span>{text1}</span>
      <div>
        <span>{text2}</span>
      </div>
      <span>{text3}</span>
    </div>
  )
} //Lyric body

const Timer = ({time, endTime}) => {
  return (
    <div>
      <h1>{time.getElapsedRunningTime()} /{endTime}</h1>
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

const PlayButton = ({onClick, disabled}) => {
  return (
    <button onClick={onClick}
    disabled = {disabled}>
      Play
    </button>
  )
}

const PauseButton = ({onClick, disabled}) => {
  return (
    <button onClick={onClick}
    disabled = {disabled}>
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
      time.pause();
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
    if (time.getElapsedRunningTime() >= endTime) {
      setState(State.Finished);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [updateTimer, state]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  const handleSearch = () => {
    setState(State.NotStarted);

    getLyrics(input)
    .then(lines => {
      stateOfLines = lines;
      console.log(stateOfLines);
      currentText = stateOfLines.at(0).words;
      afterText = stateOfLines.at(1).words;
      nextTime = stateOfLines.at(1).startTimeMs;
      setEndTime(stateOfLines.at(stateOfLines.length - 1).startTimeMs);
    })
    .catch(error => console.error("Error fetching lyrics:", error)); 
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
        endTime = {endTime}
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
        disabled = {state == State.NoSong}
      />
      <PauseButton
        onClick={handlePause}
        disabled = {state == State.NoSong}
      />
      <LyricBody
        time = {time.getElapsedRunningTime()}/>
    </div>
  );
}

export default App;
