import { Link } from "react-router-dom";
import ErrorMessage from "../common/error-message";

function Route2Results({ serviceName }) {
  // TO DO: UPDATE WHEN DEVELOP SERVICES
  let contents;
  if (
    serviceName.includes("Budget calculator") &&
    serviceName.includes("Loan calculator")
  ) {
    contents = (
      <div className="flex flex-wrap -m-4">
        <div className="p-4 md:w-1/3">
          <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col items-center">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-lg title-font font-medium">
                Budget
              </h2>
            </div>
            <div className="flex-grow">
              <p className="leading-relaxed text-base">
                Plan your family budget for the month.
              </p>
              <br></br>
              <Link to="/personal-finance/budget-calculator" target="_blank" rel="noreferrer">
                <button className="mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Start now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4 md:w-1/3">
          <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col items-center">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-lg title-font font-medium">
                Loans
              </h2>
            </div>
            <div className="flex-grow">
              <p className="leading-relaxed text-base">
                Find out what interest rates mean for your family.
              </p>
              <br></br>
              <Link to="/personal-finance/loan-calculator" target="_blank" rel="noreferrer">
                <button className=" mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Start now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4 md:w-1/3">
          <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col items-center">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-lg title-font font-medium">
                MFIs
              </h2>
            </div>
            <div className="flex-grow">
              <p className="leading-relaxed text-base">
                Access a list of licensed microfinance institutions.
              </p>
              <br></br>
              <Link to="/personal-finance/mfis" target="_blank" rel="noreferrer">
                <button className=" mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Start now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (serviceName[0] === "Budget calculator") {
    contents = (
      <div className="p-4 md:w-1/1">
        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col items-center">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">
              Budget
            </h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">
              Plan your family budget for the month.
            </p>
            <br></br>
            <Link to="/personal-finance/budget-calculator" target="_blank" rel="noreferrer">
            <button className="mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Start now
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (serviceName[0] === "Loan calculator") {
    contents = (
      <div className="flex flex-wrap -m-4">
        <div className="p-4 md:w-1/2">
          <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col items-center">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-lg title-font font-medium">
                Loans
              </h2>
            </div>
            <div className="flex-grow">
              <p className="leading-relaxed text-base">
                Find out what interest rates mean for your family.
              </p>
              <br></br>
              <Link to="/personal-finance/loan-calculator" target="_blank" rel="noreferrer">
              <button className=" mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Start now
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4 md:w-1/2">
          <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col items-center">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-lg title-font font-medium">
                MFIs
              </h2>
            </div>
            <div className="flex-grow">
              <p className="leading-relaxed text-base">
                Access a list of licensed microfinance institutions.
              </p>
              <br></br>
              <Link to="/personal-finance/mfis" target="_blank" rel="noreferrer">
              <button className=" mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Start now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    contents = (
      <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
    );
  }
  return contents;
}

export default Route2Results;
