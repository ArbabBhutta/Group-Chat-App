import React from "react";
import { auth, Provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

export default function Auth(props) {
  const { setIsAuth } = props;
  const cookies = new Cookies();
  const signIn = async () => {
    try {
      const user_Info = await signInWithPopup(auth, Provider);
      cookies.set("auth-token", user_Info.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log("your error is ", err);
    }
  };
  return (
   <div className="holder">
     <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col-sm-10 signin">
          <h1 className="mt-3 mb-3 text-light">Welcome </h1>
          <p className="text-light">Sign in To Proceed</p>
          <button className="btn btn-primary mt-3 mb-3" onClick={signIn}>Sign in With Google</button>
        </div>
      </div>
    </div>
   </div>
  );
}
