const userReviews = require("./user-reviews.js");
const mediaReviews = require("./media-reviews.js");

const bestGames = [];
userReviews.forEach((userReview) => {
  mediaReviews.forEach((mediaReview) => {
    if (
      mediaReview.title === userReview.title &&
      mediaReview.score >= 85 &&
      userReview.score >= 8.5
    ) {
      bestGames.push({
        title: userReview.title,
        user_score: userReview.score,
        media_score: mediaReview.score,
      });
    }
  });
});

console.table(bestGames);
