import { Link } from "react-router-dom";
import ErrorMessage from "../common/error-message";
import ResultsListing from "./results-listing";

function ResultsPage({ routeServiceName }) {
  if (routeServiceName === null)
    return <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>;
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-1 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              YOUR RESULTS
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Here is what we recommend
            </h1>
          </div>
          <ResultsListing
            route={routeServiceName.data.route}
            serviceName={routeServiceName.data.service}
          />
        </div>
      </section>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      >
        Submit new answers
      </button>
    </>
  );
}

export default ResultsPage;
