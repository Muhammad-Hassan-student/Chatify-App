import React, { useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { LoaderPinwheelIcon } from "lucide-react";

const OAuth = () => {
  const { signinWithGoogle, authUser, isGoogleSignin } = useAuthStore();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.getCustomParameters({ prompt: "select_account" });

    const resultsFromGoogle = await signInWithPopup(auth, provider);
    if (resultsFromGoogle) {
      console.log(resultsFromGoogle);
      signinWithGoogle(
        resultsFromGoogle.user.displayName,
        resultsFromGoogle.user.email,
        resultsFromGoogle.user.photoURL
      );
    }
  };
  useEffect(() => {
    if (authUser) {
      console.log("Navigating to home", authUser); // Check if authUser is set
      navigate("/");
    }
  }, [authUser, navigate]); // Make sure navigate is part of the dependency array
  console.log(authUser);
  return (
    <div className="w-60 mt-5">
      <button
        className="w-full flex justify-center gap-2 items-center  btn btn-primary"
        onClick={handleGoogle}
      >
        {isGoogleSignin ? (
          <LoaderPinwheelIcon className="size-10 animate-spin" />
        ) : (
          <>
            <span className="bg-base-300 px-4 py-2  font-semibold  rounded-full">
              G
            </span>
            Sign in with google
          </>
        )}
      </button>
    </div>
  );
};

export default OAuth;
