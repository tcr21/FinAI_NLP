// TO DO: add loading, error handling etc.
import ErrorMessage from "../common/error-message";
import useUser from "../data/hooks/use-user";
import axios from "axios";
import { useState } from "react";
import ResultsPage from "../results/results-page";
import LoadingSpinner from "../common/loading-spinner";

// Sign in through google account (but could do through email and password if wanted to)
function HomePage() {
  const userState = useUser();
  const [message, setMessage] = useState("");
  const [recommendedRouteService, setRecommendedRouteService] = useState(null);
  const [isLoading, setLoading] = useState(null);

  const onMessageChange = (e) => setMessage(e.target.value);

  const callServer = (message) => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/", {
        message,
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
          <h3>Please answer the following questions.</h3>
          <form action="#" method="post">
            <p>1. What is your primary concern when it comes to finance?</p>
            <p>
              <input
                type="text"
                name="message"
                id="message"
                value={message}
                onChange={onMessageChange}
              />
            </p>
          </form>
          <button onClick={() => callServer({ message })} disabled={isLoading}>
            Submit answers
          </button>
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
            <p>1. What is your primary concern when it comes to finance?</p>
            <p>
              <input
                type="text"
                name="message"
                id="message"
                value={message}
                onChange={onMessageChange}
              />
            </p>
          </form>
          <button onClick={() => callServer({ message })} disabled={isLoading}>
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
      <h1>Welcome to the financial literacy app!</h1>
      {userState.error && (
        <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
      )}
      {contents}
    </main>
  );
}

export default HomePage;
