// TO DO: add loading, error handling etc.
import ErrorMessage from "../common/error-message";
import useUser from "../data/hooks/use-user";
import axios from "axios";
import { useState } from "react";
import ResultsPage from "../results/results-page";
import LoadingSpinner from "../common/loading-spinner";
import UserQuestions from "../questions/questions";

// Sign in through google account (but could do through email and password if wanted to)
function HomePage() {
  
  const userState = useUser();
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");
  const [recommendedRouteService, setRecommendedRouteService] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const [resultsReady, setResultsReady] = useState(false);

  const onMessage1Change = (e) => setMessage1(e.target.value);
  const onMessage2Change = (e) => setMessage2(e.target.value);
  const onMessage3Change = (e) => setMessage3(e.target.value);
  const onMessage4Change = (e) => setMessage4(e.target.value);

  const callServer = (message1, message2, message3, message4) => {
    let messages = Object.assign(message1, message2, message3, message4);
    setLoading(true);
    console.log("Messages", messages);
    axios
      .post( /* Insert backend service address Home */, {
        messages,
      })
      .then((res) => {
        console.log("Receiving server output:", res);
        setRecommendedRouteService(res);
        setLoading(false);
        setResultsReady(true);
      })
      .catch((err) => console.error(err));
  };

  console.log("recommendedRouteService", recommendedRouteService);
  console.log("results ready", resultsReady);

  let contents;

  if (isLoading) {
    contents = (
      <>
        <LoadingSpinner />
      </>
    );
  } else if (resultsReady !== true) {
    contents = (
      <section className="text-gray-600 body-font">
        <div className="container px-1 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              YOUR GUIDE TO FINANCE
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Please answer so we can help
            </h1>
          </div>

          <div className="p-1 lg:w-1/1">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 py-1 pt-8 pb-8 rounded-lg overflow-hidden text-center relative">
              <form action="#" method="post">
                <div>
                  <UserQuestions questionNumber="1" />
                  <div className="mt-1">
                    <textarea
                      type="text"
                      name="message1"
                      id="message1"
                      value={message1}
                      onChange={onMessage1Change}
                      className="shadow-sm focus:ring-gray-900 focus:border-gray-900 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 py-1 px-2"
                      placeholder=" Type here"
                      rows="4"
                    />
                  </div>
                  <br></br>
                </div>
                <div>
                  <UserQuestions questionNumber="2" />
                  <div className="mt-1">
                    <textarea
                      type="text"
                      name="message2"
                      id="message2"
                      value={message2}
                      onChange={onMessage2Change}
                      className="shadow-sm focus:ring-gray-900 focus:border-gray-900 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 py-1 px-2"
                      placeholder=" Type here"
                      rows="4"
                    />
                  </div>
                  <br></br>
                </div>
                <div>
                  <UserQuestions questionNumber="3" />
                  <div className="mt-1">
                    <textarea
                      type="text"
                      name="message3"
                      id="message3"
                      value={message3}
                      onChange={onMessage3Change}
                      className="shadow-sm focus:ring-gray-900 focus:border-gray-900 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 py-1 px-2"
                      placeholder=" Type here"
                      rows="4"
                    />
                  </div>
                  <br></br>
                </div>
                <div>
                  <UserQuestions questionNumber="4" />
                  <div className="mt-1">
                    <textarea
                      type="text"
                      name="message4"
                      id="message4"
                      value={message4}
                      onChange={onMessage4Change}
                      className="shadow-sm focus:ring-gray-900 focus:border-gray-900 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 py-1 px-2"
                      placeholder=" Type here"
                      rows="4"
                    />
                  </div>
                  <br></br>
                </div>
              </form>
              <br></br>
              <br></br>
              <button
                className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 disabled:bg-gray-200 rounded text-base mt-4 md:mt-0"
                onClick={() =>
                  callServer(
                    { message1 },
                    { message2 },
                    { message3 },
                    { message4 }
                  )
                }
                disabled={isLoading || message1 === "" || message2 === "" || message3 === "" || message4 === ""}
              >
                Submit answers
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    contents = (
      <ResultsPage routeServiceName={recommendedRouteService}></ResultsPage>
    );
  }

  return (
    <main>
      {userState.error && (
        <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
      )}
      {contents}
    </main>
  );
}

export default HomePage;
