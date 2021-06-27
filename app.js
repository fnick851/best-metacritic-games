const fetch = require("node-fetch");
const cheerio = require("cheerio");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      name: "platform",
      message: "Which platform are you interested in?",
      choices: [
        "ps4",
        "ps5",
        "xboxone",
        "xbox-series-x",
        "switch",
        "pc",
        "ios",
        "stadia",
      ],
    },
    {
      name: "mediascore",
      message: "What is the minimum media score that you'd accept?",
    },
    {
      name: "userscore",
      message: "What is the minimum user score that you'd accept?",
    },
  ])
  .then(async (answers) => {
    const platform = answers.platform;
    const metaScoreBaseUrl = `https://www.metacritic.com/browse/games/release-date/available/${platform}/metascore?page=`;
    const userScoreBaseUrl = `https://www.metacritic.com/browse/games/release-date/available/${platform}/userscore?page=`;
    const minMetaScore = parseFloat(answers.mediascore);
    const minUserScore = parseFloat(answers.userscore);
    const metaReviews = [];
    const userReviews = [];
    getReviews(
      metaScoreBaseUrl,
      metaReviews,
      userScoreBaseUrl,
      userReviews,
      minMetaScore,
      minUserScore
    );
  });

async function getReviews(
  metaScoreBaseUrl,
  metaReviews,
  userScoreBaseUrl,
  userReviews,
  minMetaScore,
  minUserScore
) {
  await addReviewToListWithMinScore(
    metaScoreBaseUrl,
    0,
    metaReviews,
    minMetaScore,
    ".clamp-metascore"
  );
  await addReviewToListWithMinScore(
    userScoreBaseUrl,
    0,
    userReviews,
    minUserScore,
    ".clamp-userscore"
  );

  const bestGames = [];
  metaReviews.forEach((metaReview) => {
    userReviews.forEach((userReview) => {
      if (
        metaReview.title === userReview.title &&
        metaReview.score >= minMetaScore &&
        userReview.score >= minUserScore
      ) {
        bestGames.push({
          Title: metaReview.title,
          Mediascore: metaReview.score,
          Userscore: userReview.score,
        });
      }
    });
  });

  console.table(bestGames);
}

async function addReviewToListWithMinScore(
  baseUrl,
  currentPage,
  reviewList,
  minScore,
  scoreCssSelector
) {
  const url = baseUrl + currentPage;
  const pageBody = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(pageBody);

  $(".clamp-summary-wrap").each((i, el) => {
    const title = $(el).find(".title h3").text().trim();
    const score = parseFloat(
      $(el).find(`${scoreCssSelector} .metascore_w`).text()
    );
    reviewList.push({
      title,
      score,
    });
  });

  const currentPageMinScore = Math.min(
    ...reviewList.map((review) => review.score)
  );

  if (currentPageMinScore >= minScore) {
    await addReviewToListWithMinScore(
      baseUrl,
      ++currentPage,
      reviewList,
      minScore,
      scoreCssSelector
    );
  }
}
