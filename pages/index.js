import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [showGamesClicked, setShowGamesClicked] = useState(false);
  const [mediaScoreAsc, setMediaScoreAsc] = useState(false);
  const [userScoreAsc, setUserScoreAsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  let bodyText =
    "Choose platform, minimum media score, and minimum user score.";
  if (apiError) {
    bodyText =
      "Serverless function timeout. Try increase the minimum scores since I'm using a free hosting and there might be too many games to scrape.";
  } else if (showGamesClicked && !loading && reviews.length === 0) {
    bodyText = "No games found.";
  }

  const submitForm = async (event) => {
    event.preventDefault();
    setApiError(false);
    setLoading(true);
    setShowGamesClicked(true);

    const platform = event.target.platform.value;
    const minMediaScore = parseFloat(event.target.min_mediascore.value);
    const minUserScore = parseFloat(event.target.min_userscore.value);

    try {
      const res = await fetch(
        `/api/reviews?platform=${platform}&min_mediascore=${minMediaScore}&min_userscore=${minUserScore}`
      );
      setLoading(false);

      if (!res.ok)
        throw new Error(
          "response not ok - " + res.status + " " + res.statusText
        );

      const result = await res.json();
      setReviews(result);
    } catch (err) {
      console.error(err);
      setApiError(true);
    }
  };

  const sortTable = (scoreKey, asc) => {
    const sortedReviews = reviews.sort((a, b) => {
      return asc ? b[scoreKey] - a[scoreKey] : a[scoreKey] - b[scoreKey];
    });
    setReviews(sortedReviews);
  };

  const sortMediaScore = () => {
    setMediaScoreAsc(!mediaScoreAsc);
    sortTable("Mediascore", mediaScoreAsc);
  };

  const sortUserScore = () => {
    setUserScoreAsc(!userScoreAsc);
    sortTable("Userscore", userScoreAsc);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
          <div className="max-w-2xl mb-10 mx-auto lg:mx-0 px-5 lg:px-0">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Best Metacritic Games
            </h2>
            <p className="mt-5 text-2xl text-gray-300">
              So many games and so little time.
            </p>
            <p className="mt-5 text-xl text-gray-400">
              You might want to spend the time on the "best" ones. Nowadays, I
              find neither media review score or user review score alone on{" "}
              <a
                target="_blank"
                href="https://www.metacritic.com/"
                className="underline"
              >
                metacritic
              </a>{" "}
              is a reliable indicator of a good game for me. Due to marketing
              and various other reasons, a game could have a high media score
              but still boring or broken, while a high user score sometimes is
              boosted by certain niche fans. But if a game scores high on both,
              it is more likely a pretty decent one. You can use this tool to
              find these games.
            </p>
          </div>
          <div className="w-full max-w-xs mt-3 mx-auto lg:mx-0">
            <form onSubmit={submitForm}>
              <div className="mb-5">
                <label
                  htmlFor="platform"
                  className="block text-base font-medium text-gray-300"
                >
                  Platform
                </label>
                <div className="mt-1.5 relative">
                  <select
                    id="platform"
                    name="plaftorm"
                    className="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
                    defaultValue="ps4"
                  >
                    <option value="ps4">PlayStation 4</option>
                    <option value="ps5">PlayStation 5</option>
                    <option value="xboxone">Xbox One</option>
                    <option value="xbox-series-x">Xbox Series X</option>
                    <option value="switch">Switch</option>
                    <option value="pc">PC</option>
                    <option value="ios">iOS</option>
                    <option value="stadia">Stadia</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                    <ChevronDownIcon
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="min_mediascore"
                  className="block text-base font-medium text-gray-300"
                >
                  Minimum Media Score
                </label>
                <div className="mt-1.5 relative">
                  <select
                    id="min_mediascore"
                    name="min_mediascore"
                    className="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
                    defaultValue="85"
                  >
                    <option value="60">60</option>
                    <option value="65">65</option>
                    <option value="70">70</option>
                    <option value="75">75</option>
                    <option value="80">80</option>
                    <option value="85">85</option>
                    <option value="90">90</option>
                    <option value="95">95</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                    <ChevronDownIcon
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="min_userscore"
                  className="block text-base font-medium text-gray-300"
                >
                  Minimum User Score
                </label>
                <div className="mt-1.5 relative">
                  <select
                    id="min_userscore"
                    name="min_userscore"
                    className="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
                    defaultValue="8.5"
                  >
                    <option value="6.0">6.0</option>
                    <option value="6.5">6.5</option>
                    <option value="7.0">7.0</option>
                    <option value="7.5">7.5</option>
                    <option value="8.0">8.0</option>
                    <option value="8.5">8.5</option>
                    <option value="9.0">9.0</option>
                    <option value="9.5">9.5</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                    <ChevronDownIcon
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                {loading ? "Loading..." : "Show Games"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center py-20 text-gray-400 text-3xl px-10 md:px-0">
          {bodyText}
        </p>
      ) : (
        <div className="max-w-7xl mx-auto flex-grow">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Game Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={sortMediaScore}
                        >
                          <span className="flex items-center">
                            Media Score{" "}
                            {mediaScoreAsc ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={sortUserScore}
                        >
                          <span className="flex items-center">
                            User Score{" "}
                            {userScoreAsc ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review, reviewIdx) => (
                        <tr
                          key={reviewIdx}
                          className={
                            reviewIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {review.Title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {review.Mediascore}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {review.Userscore}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
