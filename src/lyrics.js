import { useState, useEffect } from 'react';


/* 
ok so I get the input as a JSON array (lines), and the currentTime in the playback (mm:ss:msms)
I want to separate the JSON array into three lines, before, current, and after
the three strings should constantly be changing based on the currentTime and should be changing:
beforeText to the currentText
currentText to the afterText
afterText to the next lyric in the array
so the changing is based on the currentText, but it's just shifting it over
nextTime = afterText time
when currentTime >= nextTime
shift left for each text
nextTime = afterText time 
need a pointer to the array 
*/

const outer = JSON.parse(lines);
// each lyrics element will be an object with (timeTag, words)
const lyrics = outer.map(jsonStr => JSON.parse(jsonStr));
var beforeText, currentText, afterText, nextTime;
var nextPos = 2;

const ScrollingLyrics = ({ currentTime, lines }) => {
    beforeText = "";
    currentText = lyrics[0].words;
    afterText = lyrics[1].words;
    nextTime = lyrics[1].timeTag;

    return (
        <div>
            <p>{beforeText}</p>
            <p>{currentText}</p>
            <p>{afterText}</p> 
        </div>
    ); 
}

const updateText = (currentTime) => {
    if (currentTime < nextTime)
        return;

    beforeText = currentText;
    currentText = afterText;
    if (nextPos + 1 >= lyrics.length)
        afterText = "";
    else {
        nextPos++;
        afterText = lyrics[nextPos].words;
        nextTime = lyrics[nextPos].timeTag;
    }

    return;
}

