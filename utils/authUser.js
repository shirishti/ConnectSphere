import axios from "axios";
import catchErrors from "./catchErrors";
import Router from "next/router";
import cookie from "js-cookie";

export const registerUser = async (user, profilePicUrl, setError, setLoading) => {
    try {
      const res = await axios.post("/api/signup", { user, profilePicUrl });
  
      setToken(res.data);
      console.log("success");
    } catch (error) {
      const errorMsg = catchErrors(error);
      setError(errorMsg);
    }
    setLoading(false);
};
  

export const loginUser = async (user, setError, setLoading) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth", { user });
  
      setToken(res.data);
    } catch (error) {
      const errorMsg = catchErrors(error);
      setError(errorMsg);
    }
    setLoading(false);
};
  
const setToken = token => {
    cookie.set("token", token);
    Router.push("/");
  };
  