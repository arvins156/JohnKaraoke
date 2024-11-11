const updateText = (lyrics, currentTime, nextTime, beforeText, currentText, afterText, nextPos) => {
    if (currentTime < nextTime)
        return;

    beforeText = currentText;
    currentText = afterText;
    if (nextPos + 1 >= lyrics.length)
        afterText = "";
    else {
        nextPos++;
        afterText = lyrics[nextPos].words;
        nextTime = lyrics[nextPos].startTimeMs;
    }

    return { beforeText, currentText, afterText }
}
    /*
    currentText = lyrics[0].words;
    afterText = lyrics[1].words;
    nextTime = lyrics[1].timeTag;

*/
export{updateText}