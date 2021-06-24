# Find the best metacritic games

## So many games and so little time.

Nowadays, I find neither media review score or user review score on metacritic site is a completely reliable indicator for a "good game". So I decide to write some code to find the games that score high for both.

1. On a metacritic score listing page, e.g. https://www.metacritic.com/browse/games/release-date/available/ps4/userscore (for all PS4 games), with Chrome DevTools open, paste this code to a snippet in "Sources - Snippets":

```js
let allWraps = document.querySelectorAll(".clamp-summary-wrap");

let reviews = [];
allWraps.forEach((wrap) => {
  const title = wrap.querySelector(".title h3");
  const score = wrap.querySelector(".metascore_anchor div");
  reviews.push({
    title: title.textContent,
    score: score.textContent,
  });
});

console.log(reviews);
```

2. Run this snippet, it'll log all the titles and scores on the page. Right click on the browser console output and copy it.
3. Paste the data into `user-reviews.js` and `media-reviews.js`, repectively.
4. Make sure you have [Node.js](https://nodejs.org/) installed.
5. In a terminal app, run `node best-games.js` . It'll show log a list of games that score more than 85 for media review, and more than 8.5 for user review. You can modify these scores in the code.

   For example, as of June 24, 2021, these are the best PS4 games based on this criteria:

```js
[
  {
    title: "The Witcher 3: Wild Hunt",
    user_score: "9.2",
    media_score: "92",
  },
  {
    title: "The Last of Us Remastered",
    user_score: "9.2",
    media_score: "95",
  },
  { title: "God of War", user_score: "9.2", media_score: "94" },
  {
    title: "The Witcher 3: Wild Hunt - Blood and Wine",
    user_score: "9.1",
    media_score: "91",
  },
  {
    title: "The Witcher 3: Wild Hunt - Hearts of Stone",
    user_score: "9.0",
    media_score: "90",
  },
  { title: "It Takes Two", user_score: "9.0", media_score: "89" },
  { title: "Dark Souls III", user_score: "8.9", media_score: "89" },
  { title: "NieR: Automata", user_score: "8.9", media_score: "88" },
  { title: "Resident Evil 2", user_score: "8.9", media_score: "91" },
  {
    title: "Astro Bot: Rescue Mission",
    user_score: "8.9",
    media_score: "90",
  },
  { title: "DOOM Eternal", user_score: "8.9", media_score: "87" },
  {
    title: "Uncharted 4: A Thief's End",
    user_score: "8.8",
    media_score: "93",
  },
  { title: "Bloodborne", user_score: "8.8", media_score: "92" },
  {
    title: "Bloodborne: The Old Hunters",
    user_score: "8.8",
    media_score: "87",
  },
  {
    title: "Tony Hawk's Pro Skater 1 + 2",
    user_score: "8.8",
    media_score: "89",
  },
  { title: "Persona 5", user_score: "8.7", media_score: "93" },
  { title: "Dreams", user_score: "8.7", media_score: "89" },
  {
    title: "Marvel's Spider-Man",
    user_score: "8.7",
    media_score: "87",
  },
  {
    title: "Final Fantasy XIV: Stormblood",
    user_score: "8.7",
    media_score: "89",
  },
  {
    title: "NieR: Automata - Game of the YoRHa Edition",
    user_score: "8.7",
    media_score: "91",
  },
  {
    title: "Uncharted: The Nathan Drake Collection",
    user_score: "8.6",
    media_score: "86",
  },
  { title: "Titanfall 2", user_score: "8.5", media_score: "89" },
  {
    title: "Red Dead Redemption 2",
    user_score: "8.5",
    media_score: "97",
  },
  {
    title: "Mega Man X Legacy Collection",
    user_score: "8.5",
    media_score: "89",
  },
];
```
