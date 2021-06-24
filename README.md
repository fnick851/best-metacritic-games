# Find the best metacritic games

## So many games and so little time. 

Nowadays, I find neither media review score or user review score on metacritic site is a completely reliable indicator for a "good game". So I decide to write some code to find the games that score high for both.

1. On a metacritic score listing page, e.g. https://www.metacritic.com/browse/games/release-date/available/ps4/userscore (for all PS4 games), with Chrome DevTools open, paste this code to a snippet in "Sources - Snippets":
```js
let allWraps = document.querySelectorAll('.clamp-summary-wrap')

let reviews = []
allWraps.forEach(wrap => {
  const title = wrap.querySelector('.title h3')
  const score = wrap.querySelector('.metascore_anchor div')
  reviews.push({
    title: title.textContent,
    score: score.textContent
  })
})

console.log(reviews)
```

2. Run this snippet, it'll log all the titles and scores on the page. Right click on the browser console output and copy it.
3. Paste the data into `user-reviews.js` and `media-reviews.js`, repectively.
4. Make sure you have [Node.js](https://nodejs.org/) installed.
4. In a terminal app, run `node best-games.js` . It'll show log a list of games that score more than 85 for media review, and more than 8.5 for user review. You can modify these scores in the code.
