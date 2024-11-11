import './styles.css';
import { getLyrics } from './api.js';
import { useState, useEffect } from 'react';
import { useStopwatch } from "react-use-precision-timer";
import { updateText } from './utils';
import pauseButton from './assets/pause-button.svg'
import playButton from './assets/play-button.svg'
import searchButton from './assets/search-button.svg'

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
      <span
        className="previous-lyrics">{text1}</span>
      <div>
        <span
          className="current-lyrics">{text2}</span>
      </div>
      <span 
        className="future-lyrics">{text3}</span>
    </div>
  )
} //Lyric body

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;

  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }

  return mins + ':' + secs;
}

const Timer = ({time, endTime}) => {
  let t1 = msToTime(time);
  let t2 = msToTime(endTime);
  return (
    <div class="elapsed-time">
      <h2>{t1}/{t2}</h2>
    </div>
  )
}  //Song timer

const ProgressBar = ({ time, endTime }) => {
  var progress = time / endTime;
  return (
    <div>
      <progress value={progress}
        className="progress-bar"/>
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
        className="search-bar"
      />
    </div>
  )
} //Input box

const SearchButton = ({onClick}) => {
  return (
    <button onClick={onClick}
    className="search-bar-button">
      <img src={searchButton} />
    </button>
  )
}

const PlayButton = ({onClick, disabled}) => {
  return (
    <button onClick={onClick}
    disabled = {disabled}
    className="play-button">
      <img src={playButton} />
    </button>
  )
}

const PauseButton = ({onClick, disabled}) => {
  return (
    <button onClick={onClick}
    disabled = {disabled}
    className="pause-button">
      <img src={pauseButton} />
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
      time.stop();
      setInput("");
      setEndTime(0);
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
    beforeText = "";
    currentText ="";
    afterText ="";
    nextTime = 0;
    nextPos = 1;
    stateOfLines =[];
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
    <div className="main-page"> 
      <div className="top-row-container">
        <div className="title-container">
          <div className="title">
            <h1>JohnKaraoke</h1>
          </div>
        </div>
        <InputBox
        input = {input}
        handleInputChange={handleInputChange}
        />
        <div>
          <SearchButton
            onClick={handleSearch}
          />
        </div>  
      </div>
    
      <div className="middle-row-container">
        <LyricBody
          time = {time.getElapsedRunningTime()}/>
      </div>
  
        <div className="bottom-row-container">
          <div className="buttons-container">
            <PlayButton
              onClick={handlePlay}
              disabled = {state === State.NoSong}
            />
            <PauseButton
              onClick={handlePause}
              disabled = {state === State.NoSong}
          />
        </div>
        

        <div className="progress-bar-container">
          <ProgressBar
            time = {time.getElapsedRunningTime() >= endTime ? endTime:time.getElapsedRunningTime()}
            endTime = {endTime}/>
          <Timer
            time = {time.getElapsedRunningTime() >= endTime ? endTime:time.getElapsedRunningTime()}
            endTime = {endTime} />
        </div>
      </div>
    </div>
  );
}

export default App;
