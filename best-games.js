const puppeteer = require("puppeteer");
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
  ])
  .then((answers) => {
    const platform = answers.platform;
    const urls = [
      `https://www.metacritic.com/browse/games/release-date/available/${platform}/userscore`,
      `https://www.metacritic.com/browse/games/release-date/available/${platform}/metascore`,
    ];
    getGames(urls);
  });

async function getGames(urls) {
  const browser = await puppeteer.launch({ headless: false });

  const collect = async (url) => {
    const page = await browser.newPage();
    await page.goto(url);
    return await page.evaluate(() => {
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
      return reviews;
    });
  };

  const allReviews = await Promise.all(urls.map(collect));

  const bestGames = [];
  allReviews[0].forEach((review0) => {
    allReviews[1].forEach((review1) => {
      if (
        review1.title === review0.title &&
        review1.score >= 85 &&
        review0.score >= 8.5
      ) {
        bestGames.push({
          title: review0.title,
          user_score: review0.score,
          media_score: review1.score,
        });
      }
    });
  });

  console.table(bestGames);
  process.exit(0);
}
