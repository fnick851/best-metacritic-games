import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";
import UpArrow from "../components/UpArrow";
import DownArrow from "../components/DownArrow";

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

  const dropdowns = [
    {
      id: "platform",
      label: "Platform",
      defaultVal: "ps4",
      options: [
        { value: "ps4", text: "PlayStation 4" },
        { value: "ps5", text: "PlayStation 5" },
        { value: "xboxone", text: "Xbox One" },
        { value: "xbox-series-x", text: "Xbox Series X" },
        { value: "switch", text: "Switch" },
        { value: "pc", text: "PC" },
        { value: "ios", text: "iOS" },
        { value: "stadia", text: "Stadia" },
      ],
    },
    {
      id: "min_mediascore",
      label: "Minimum Media Score",
      defaultVal: "85",
      options: [
        { value: 60, text: "60" },
        { value: 65, text: "65" },
        { value: 70, text: "70" },
        { value: 75, text: "75" },
        { value: 80, text: "80" },
        { value: 85, text: "85" },
        { value: 90, text: "90" },
        { value: 95, text: "95" },
      ],
    },
    {
      id: "min_userscore",
      label: "Minimum User Score",
      defaultVal: "8.5",
      options: [
        { value: 6.0, text: "6.0" },
        { value: 6.5, text: "6.5" },
        { value: 7.0, text: "7.0" },
        { value: 7.5, text: "7.5" },
        { value: 8.0, text: "8.0" },
        { value: 8.5, text: "8.5" },
        { value: 9.0, text: "9.0" },
        { value: 9.5, text: "9.5" },
      ],
    },
  ];

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
              {dropdowns.map(
                ({ id, label, defaultVal, options }, dropdownIdx) => (
                  <div className="mb-5" key={dropdownIdx}>
                    <label
                      htmlFor={id}
                      className="block text-base font-medium text-gray-300"
                    >
                      {label}
                    </label>
                    <div className="mt-1.5 relative">
                      <select
                        id={id}
                        name={id}
                        className="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
                        defaultValue={defaultVal}
                      >
                        {options.map(({ value, text }, optionIdx) => (
                          <option value={value} key={optionIdx}>
                            {text}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                        <ChevronDownIcon
                          className="h-4 w-4 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
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
                            {mediaScoreAsc ? <DownArrow /> : <UpArrow />}
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={sortUserScore}
                        >
                          <span className="flex items-center">
                            User Score{" "}
                            {userScoreAsc ? <DownArrow /> : <UpArrow />}
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
