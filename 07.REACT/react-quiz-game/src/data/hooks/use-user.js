import { useEffect, useState } from "react";
import { auth, provider } from "../firebase";

function useUser() {
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
export default useUser;
