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

  const onMessage1Change = (e) => setMessage1(e.target.value);
  const onMessage2Change = (e) => setMessage2(e.target.value);
  const onMessage3Change = (e) => setMessage3(e.target.value);
  const onMessage4Change = (e) => setMessage4(e.target.value);

  const callServer = (message1, message2, message3, message4) => {
    let messages = Object.assign(message1, message2, message3, message4);
    setLoading(true);
    console.log("Messages", messages);
    axios
      .post("http://127.0.0.1:5000/", {
        messages,
      })
      .then((res) => {
        console.log("Receiving server output:", res);
        setRecommendedRouteService(res);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  console.log("recommendedRouteService", recommendedRouteService);

  let contents;

  if (userState.isSignedIn) {
    if (isLoading) {
      contents = (
        <>
          <LoadingSpinner />
          <button onClick={userState.signOut} disabled={userState.isLoading}>
            {userState.isLoading ? "Signing out..." : "Sign out"}
          </button>
        </>
      );
    } else {
      contents = (
        <>
          <h3>Please answer the following questions.</h3>
          <form action="#" method="post">
            <UserQuestions questionNumber="1" />
            <p>
              <input
                type="text"
                name="message1"
                id="message1"
                value={message1}
                onChange={onMessage1Change}
              />
            </p>
            <UserQuestions questionNumber="2" />
            <p>
              <input
                type="text"
                name="message2"
                id="message2"
                value={message2}
                onChange={onMessage2Change}
              />
            </p>
            <UserQuestions questionNumber="3" />
            <p>
              <input
                type="text"
                name="message3"
                id="message3"
                value={message3}
                onChange={onMessage3Change}
              />
            </p>
            <UserQuestions questionNumber="4" />
            <p>
              <input
                type="text"
                name="message4"
                id="message4"
                value={message4}
                onChange={onMessage4Change}
              />
            </p>
          </form>
          <button
            onClick={() =>
              callServer({ message1 }, { message2 }, { message3 }, { message4 })
            }
            disabled={isLoading}
          >
            Submit answers
          </button>
          <ResultsPage routeServiceName={recommendedRouteService}></ResultsPage>
          <button onClick={userState.signOut} disabled={userState.isLoading}>
            {userState.isLoading ? "Signing out..." : "Sign out"}
          </button>
        </>
      );
    }
  } else {
    contents = (
      <>
        <p>
          This app is here to help you learn about how to improve your personal
          finances! Sign in with your Google account below to get started.
        </p>
        <button onClick={userState.signIn} disabled={userState.isLoading}>
          {userState.isLoading ? "Signing in..." : "Sign in"}
        </button>
      </>
    );
  }

  return (
    <main>
      <h1 className="text-3xl font-bold underline">
        Welcome to the financial literacy app!
      </h1>
      {userState.error && (
        <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
      )}
      {contents}
    </main>
  );
}

export default HomePage;
