import puppeteer from "puppeteer";
import inquirer from "inquirer";

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
  .then((answers: { platform: string }) => {
    const platform = answers.platform;
    const urls = [
      `https://www.metacritic.com/browse/games/release-date/available/${platform}/userscore`,
      `https://www.metacritic.com/browse/games/release-date/available/${platform}/metascore`,
    ];
    getGames(urls);
  });

type ReviewEntry = { title: string; score: number };
type ResultEntry = {
  title: string;
  media_score: number;
  user_score: number;
};

async function getGames(urls: string[]) {
  const browser = await puppeteer.launch({ headless: false });

  const collect = async (url: string) => {
    const page = await browser.newPage();
    await page.goto(url);
    return await page.evaluate(() => {
      const allWraps = document.querySelectorAll(".clamp-summary-wrap");
      const reviews: ReviewEntry[] = [];
      allWraps.forEach((wrap) => {
        const title = wrap.querySelector(".title h3");
        const score = wrap.querySelector(".metascore_anchor div");
        reviews.push({
          title: title?.textContent as string,
          score: parseFloat(score?.textContent as string),
        });
      });
      return reviews;
    });
  };

  const allReviews = (await Promise.all(urls.map(collect))) as unknown as [
    ReviewEntry[],
    ReviewEntry[]
  ];

  const bestGames: ResultEntry[] = [];
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
