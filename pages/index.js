import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";
import UpArrow from "../components/UpArrow";
import DownArrow from "../components/DownArrow";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import I18nToggle from "../components/I18nToggle";

function Slider({
  labelText,
  id,
  maxVal,
  minVal,
  step,
  defalutVal,
  hasDecimal,
}) {
  const [value, setValue] = useState(defalutVal);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-base font-medium text-gray-300">
        {labelText}
      </label>
      <div className="mt-1.5 relative">
        <div className="flex items-center gap-3">
          <span className="text-white">
            {hasDecimal ? parseFloat(value).toFixed(1) : value}
          </span>
          <input
            type="range"
            min={minVal}
            max={maxVal}
            step={step}
            className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
            id={id}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [showGamesClicked, setShowGamesClicked] = useState(false);
  const [mediaScoreAsc, setMediaScoreAsc] = useState(false);
  const [userScoreAsc, setUserScoreAsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const { t } = useTranslation("common");

  let bodyText = t("started");
  if (apiError) {
    bodyText = t("error");
  } else if (showGamesClicked && !loading && reviews.length === 0) {
    bodyText = t("no games");
  }

  const submitForm = async (event) => {
    event.preventDefault();
    setShowGamesClicked(true);
    setApiError(false);
    setReviews([]);
    setLoading(true);

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
      label: t("platform"),
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
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-right pt-5">
          <I18nToggle />
        </div>
        <div className="max-w-7xl mx-auto py-5 px-4 sm:py-10 sm:px-6 lg:px-8 lg:flex lg:justify-between gap-5">
          <div className="max-w-2xl mb-10 mx-auto lg:mx-0 px-5 lg:px-0">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-2xl text-gray-300">{t("headline")}</p>
            <p className="mt-5 text-xl text-gray-400">
              {t("body1")}
              <a
                target="_blank"
                href="https://www.metacritic.com/"
                rel="noopener noreferrer"
                className="underline"
              >
                metacritic
              </a>
              {t("body2")}
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
              <Slider
                labelText={t("min media score")}
                id="min_mediascore"
                minVal={0}
                maxVal={100}
                step={1}
                defalutVal={80}
              />
              <Slider
                labelText={t("min user score")}
                id="min_userscore"
                minVal={0}
                maxVal={10}
                step={0.1}
                defalutVal={8.0}
                hasDecimal
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-600"
              >
                {loading ? t("button loading") : t("button default")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {reviews.length === 0 || apiError ? (
        <p className="text-center py-20 text-gray-500 text-3xl px-10 md:px-0">
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
                          {t("table col1")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={sortMediaScore}
                        >
                          <span className="flex items-center">
                            {t("table col2")}
                            {mediaScoreAsc ? <DownArrow /> : <UpArrow />}
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={sortUserScore}
                        >
                          <span className="flex items-center">
                            {t("table col3")}
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
                            <a
                              href={"https://www.metacritic.com" + review.Link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {review.Title}
                            </a>
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
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
