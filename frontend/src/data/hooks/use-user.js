import { useEffect, useState, createContext, useContext } from "react";
import { auth, provider } from "../firebase";

function useUserInternal() {
  const [userState, setUserState] = useState({
    user: auth.currentUser,
    isLoading: auth.currentUser === null ? true : false,
    error: null,
  });
  const { user, isLoading, error } = userState;
  const isSignedIn = user !== null;
  const userId = isSignedIn ? user.uid : undefined;

  useEffect(() => {
    // Function called when Firebase loads up user from persistent storage or when auth changes
    const onChange = (currentUser) => {
      setUserState({ user: currentUser, isLoading: false, error: null });
    };

    // Function called only when onAuthStateChnaged encounters error (not for sign in/ out error)
    const onError = (error) => {
      console.error(error);
      setUserState({ user: null, isLoading: false, error });
    };
    const unsubscribe = auth.onAuthStateChanged(onChange, onError);
    // Can return function that stops call back from running (react cleans up when hook is unmounted from page)
    // Function registers function to run when effect is cleaned up
    return unsubscribe;
  }, []);

  const signIn = async () => {
    setUserState({
      user: null,
      isLoading: true,
      error: null,
      isSignedIn: false,
    });
    try {
      const credentials = await auth.signInWithPopup(provider);
      setUserState({
        user: credentials.user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error(error);
      setUserState({ user: null, isLoading: false, error });
    }
  };

  const signOut = async () => {
    setUserState({
      user: userState.user,
      isLoading: true,
      error: null,
    });
    try {
      await auth.signOut();
      console.log("Signed out");
      setUserState({
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error(error);
      setUserState({
        user: userState.user,
        isLoading: false,
        error,
      });
    }
  };

  // Return object from hook instead of array because have a lot of data
  return {
    user,
    userId,
    isLoading,
    isSignedIn,
    error,
    signIn,
    signOut,
  };
}

// Create context for user, default value is null so we can determine if context has been properly initialised in app tree
const UserContext = createContext(null);

function UserProvider({ children }) {
  const userState = useUserInternal();
  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

function useUser() {
  const userState = useContext(UserContext);
  // Check if provider is missing
  if (userState === null) {
    throw new Error(
      "useUser needs to have a UserProvider component as parent component in React tree"
    );
  }
  return userState;
}

export default useUser;
export { UserContext, UserProvider };
