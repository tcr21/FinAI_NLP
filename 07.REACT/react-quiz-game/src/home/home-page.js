// TO DO: add loading, error handling etc.
import ErrorMessage from "../common/error-message";
import useUser from "../data/hooks/use-user";

// Sign in through google account (but could do through email and password if wanted to)
function HomePage() {
  const userState = useUser();

  let contents;
  if (userState.isSignedIn) {
    contents = (
      <>
        {/* <p>TO DO: put user's quizzes/ dashboard/ welcome back message on this page</p> */}
        <p>Head to the quizzes page to start playing!</p>
        <button onClick={userState.signOut} disabled={userState.isLoading}>
          {userState.isLoading ? "Signing out..." : "Sign out"}
        </button>
      </>
    );
  } else {
    contents = (
      <>
        <p>
          This app helps you learn about finance through quizzes! Sign in with
          your Google account below to get started.
        </p>
        <button onClick={userState.signIn} disabled={userState.isLoading}>
          {userState.isLoading ? "Signing in..." : "Sign in"}
        </button>
      </>
    );
  }

  return (
    <main>
      <h1>Welcome to the financial literacy for women app!</h1>
      {userState.error && (
        <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
      )}
      {contents}
    </main>
  );
}

export default HomePage;
