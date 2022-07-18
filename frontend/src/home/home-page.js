// TO DO: add loading, error handling etc.
import ErrorMessage from "../common/error-message";
import useUser from "../data/hooks/use-user";
import axios from "axios";
import { useState } from "react";
import ResultsPage from "../results/results-page";

// Sign in through google account (but could do through email and password if wanted to)
function HomePage() {
  const userState = useUser();
  const [message, setMessage] = useState("");
  // TO FIX
  const [recommendedRoute, setRecommendedRoute] = useState(null);
  const [recommendedService, setRecommendedService] = useState(null); // Didn't work

  const onMessageChange = (e) => setMessage(e.target.value);

  const callServer = (message) => {
    axios
      .post("http://127.0.0.1:5000/", {
        message,
      })
      .then((res) => {
        console.log("Receiving server output:", res.data); // res.data is a string, res is json
        let res_route = res.data.split(" |")[0]; // FIND BETTER ALTERNATIVE
        let res_service = res.data.split("| ")[1];
        console.log("Res route:", res_route);
        console.log("Res_service", res_service);
        setRecommendedService(res_service);
        setRecommendedRoute(res_route);
      })
      .catch((err) => console.error(err));
  };

  let contents;

  if (userState.isSignedIn) {
    contents = (
      <>
        {/* <p>TO DO: put user's quizzes/ dashboard/ welcome back message on this page</p> */}
        <h3>
          Please answer the following questions so we can direct you towards
          what we think will be most helpful to you.
        </h3>
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
        <button onClick={() => callServer({ message })}>Submit answers</button>
        {/* TO DO: Redirect to right page (add route to app.js) */}
        <ResultsPage
          // TO FIX
          route={recommendedRoute}
          serviceName={recommendedService}
        ></ResultsPage>
        <button onClick={userState.signOut} disabled={userState.isLoading}>
          {userState.isLoading ? "Signing out..." : "Sign out"}
        </button>
      </>
    );
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

  console.log("recommendedRoute:", recommendedRoute);
  console.log("recommendedService:", recommendedService); // Is null for some reason

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
