const updateText = (lyrics, currentTime, nextTime, beforeText, currentText, afterText, nextPos) => {
    let text1 = beforeText;
    let text2 = currentText;
    let text3 = afterText;
    let nTime = nextTime;
    let pos = nextPos;
    if (currentTime.time >= nextTime) {
        text1 = currentText;
        text2 = afterText;
        if (nextPos + 1 >= lyrics.length)
            text3 = "";
        else {
            pos++;
            text3 = lyrics[pos].words;
            nTime = lyrics[pos].startTimeMs;
        }
        return { text1, text2, text3, nTime, pos}
    }
    return { text1, text2, text3, nTime, pos};
}
    /*
    currentText = lyrics[0].words;
    afterText = lyrics[1].words;
    nextTime = lyrics[1].timeTag;

*/
export{updateText}