import { Link } from "react-router-dom";
import "./page-header.css";
import useUser from "../data/hooks/use-user";
import { useState } from "react";

function PageHeader() {
  const userState = useUser();
  const [isOnStartPage, setStartPage] = useState(true);
  const [isOnLearnPage, setLearnPage] = useState(null);
  const [isOnBudgetPage, setBudgetPage] = useState(null);

  const setStartPageFunction = () => {
    setStartPage(true);
    setLearnPage(false);
    setBudgetPage(false);
    console.log("window location", window.location);
    console.log(window.location.pathname === "/");
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  const setLearnPageFunction = () => {
    setStartPage(false);
    setLearnPage(true);
    setBudgetPage(false);
  };

  const setBudgetPageFunction = () => {
    setStartPage(false);
    setLearnPage(false);
    setBudgetPage(true);
  };

  let contents;

  if (isOnStartPage) {
    contents = (
      <header>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="#/"
            className="flex title-font font-medium items-center text-white-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <span className="ml-3 text-xl">FinLit</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t"
              to="/"
              onClick={setStartPageFunction}
            >
              Start
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/learning"
              onClick={setLearnPageFunction}
            >
              Learn
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/personal-finance"
              onClick={setBudgetPageFunction}
            >
              Manage
            </Link>
          </nav>
          <button
            onClick={
              userState.isSignedIn ? userState.signOut : userState.signIn
            }
            disabled={userState.isLoading}
            className="inline-flex items-center bg-gray-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            {userState.isSignedIn ? "Sign out" : "Sign in"}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    );
  } else if (isOnLearnPage) {
    contents = (
      <header>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="#/"
            className="flex title-font font-medium items-center text-white-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">FinLit</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/"
              onClick={setStartPageFunction}
            >
              Start
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t"
              to="/learning"
              onClick={setLearnPageFunction}
            >
              Learn
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/personal-finance"
              onClick={setBudgetPageFunction}
            >
              Manage
            </Link>
          </nav>
          <button
            onClick={
              userState.isSignedIn ? userState.signOut : userState.signIn
            }
            disabled={userState.isLoading}
            className="inline-flex items-center bg-gray-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            {userState.isSignedIn ? "Sign out" : "Sign in"}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    );
  } else if (isOnBudgetPage) {
    contents = (
      <header>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="#/"
            className="flex title-font font-medium items-center text-white-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">FinLit</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/"
              onClick={setStartPageFunction}
            >
              Start
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/learning"
              onClick={setLearnPageFunction}
            >
              Learn
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t"
              to="/personal-finance"
              onClick={setBudgetPageFunction}
            >
              Manage
            </Link>
          </nav>
          <button
            onClick={
              userState.isSignedIn ? userState.signOut : userState.signIn
            }
            disabled={userState.isLoading}
            className="inline-flex items-center bg-gray-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            {userState.isSignedIn ? "Sign out" : "Sign in"}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    );
  } else {
    contents = (
      <header>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="#/"
            className="flex title-font font-medium items-center text-white-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <span className="ml-3 text-xl">FinLit</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/"
              onClick={setStartPageFunction}
            >
              Start
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/learning"
              onClick={setLearnPageFunction}
            >
              Learn
            </Link>
            <Link
              className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider"
              to="/personal-finance"
              onClick={setBudgetPageFunction}
            >
              Manage
            </Link>
          </nav>
          <button
            onClick={
              userState.isSignedIn ? userState.signOut : userState.signIn
            }
            disabled={userState.isLoading}
            className="inline-flex items-center bg-gray-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            {userState.isSignedIn ? "Sign out" : "Sign in"}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    );
  }

  return contents;
}

export default PageHeader;
