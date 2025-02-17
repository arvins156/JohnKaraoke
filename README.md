# JohnKaraoke
Project submission to HackCamp 2024.

## Inspiration
We love karaoke, and we wanted to build something that makes it more fun and accessible for everyone. Singing along to our favorite songs should be seamless, with clear lyrics and easy-to-use controls. Our goal was to create a karaoke tool that syncs lyrics in real time, making it easier for users to follow along. By designing JohnKaraoke, we hoped to provide a simple yet powerful way for anyone to enjoy singing, whether alone or with friends, without the hassle of extra software or manual lyric searches.

## What it does

JohnKaraoke is a web-based karaoke player that displays past, current, and upcoming lyrics in sync with the song. It plays and pauses music while tracking song progress so users always know where they are in the performance. With an intuitive interface, users can follow along easily without losing their place. The goal is to make karaoke more engaging and dynamic by providing a smooth experience where the lyrics are always available at the right time, ensuring a frustration-free singalong.

## How we built it

We developed JohnKaraoke using JavaScript, React, and Node.js, ensuring a responsive and interactive user experience. The design was first prototyped in Figma, where we planned the interface layout, focusing on clarity and ease of use. The backend was integrated with the Spotify lyrics API to fetch real-time lyrics, while the frontend handled lyric synchronization, song playback controls, and progress tracking. A lot of effort went into making sure the UI was both visually appealing and functional across different devices.

## Challenges we ran into
- Getting the Spotify lyrics API to properly integrate and deploy within our project.
- Ensuring the CSS worked well on various screen resolutions and window sizes.
- Debugging the search feature, which wasn’t returning accurate results at first.
- Managing timers to sync the lyrics with the correct part of the song.
- Correctly formatting and displaying time progress beside the progress bar.

## Accomplishments that we’re proud of
One of our biggest achievements was successfully extracting and displaying lyrics in sync with the music, making JohnKaraoke a functional and enjoyable karaoke tool. We also finalized a clean and responsive CSS layout, ensuring that lyrics, progress bars, and controls were clearly visible and easy to use. Completing this project within the time constraints of the hackathon was a big win for us, as we tackled technical challenges and refined the user experience to create something polished and engaging.

## What we learned
Throughout this project, we gained valuable experience in team collaboration, learning how to delegate tasks effectively and work together under a tight deadline. We improved our understanding of JavaScript, particularly in handling real-time interactions and API integration. Additionally, we became more comfortable structuring websites using containers, making our layout more flexible and adaptable. This experience has strengthened our problem-solving skills and our ability to build functional, user-friendly applications.

## What’s next for JohnKaraoke
We have exciting plans to enhance JohnKaraoke beyond its current features. We want to add custom settings that allow users to adjust the pace and volume of the song, making it easier to sing at a comfortable speed. Another feature we’re exploring is split-screen lyrics, so multiple users can follow different parts of a duet or group song. Additionally, we plan to expand the search function beyond Spotify, allowing users to access a wider range of songs. Future updates may also introduce the ability to save favorite songs and include a music video background for a more immersive karaoke experience.

## Use

* Requires PHP
```sh
cd spotify-lyrics-api
```

* Requires Spotify Cookie/Token
```sh
export SP_DC=[token here and remove the square brackets]
php -S localhost:8000 api/index.php
```
* API from: [spotify-lyrics-api](https://github.com/akashrchandran/spotify-lyrics-api)
* cd to JohnKaraoke
```sh
npm install
npm start
```
## Links
* [Demo](https://www.youtube.com/watch?v=G7PKm0D7Yyc)
* [Devpost](https://devpost.com/software/johnkaraoke)
