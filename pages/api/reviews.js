// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cheerio from "cheerio";

export default async (req, res) => {
  const { platform, min_mediascore, min_userscore } = req.query;

  const metaScoreBaseUrl = `https://www.metacritic.com/browse/games/release-date/available/${platform}/metascore?page=`;
  const userScoreBaseUrl = `https://www.metacritic.com/browse/games/release-date/available/${platform}/userscore?page=`;
  const minMetaScore = parseFloat(min_mediascore);
  const minUserScore = parseFloat(min_userscore);
  const metaReviews = [];
  const userReviews = [];

  await Promise.all([
    addReviewToListWithMinScore(
      metaScoreBaseUrl,
      0,
      metaReviews,
      minMetaScore,
      ".clamp-metascore"
    ),
    addReviewToListWithMinScore(
      userScoreBaseUrl,
      0,
      userReviews,
      minUserScore,
      ".clamp-userscore"
    ),
  ]);

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
          Link: metaReview.href,
          Mediascore: metaReview.score,
          Userscore: userReview.score,
        });
      }
    });
  });

  res.status(200).json(bestGames);
};

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
    const title = $(el).find("a.title h3").text().trim();
    const score = parseFloat(
      $(el).find(`${scoreCssSelector} .metascore_w`).text()
    );
    const href = $(el).find("a.title")[0].attribs.href;

    reviewList.push({
      title,
      score,
      href,
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
