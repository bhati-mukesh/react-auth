import { useState } from "react";
import { useMutation } from "react-query";
import Loader from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import { loginService } from "../services/login";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { toast, ToastContainer } from "react-toastify";

const centerDiv = {
  display: "flex",
  justifyContent: "center",
};

const Login = ({ setUser }) => {
  const successNotify = () => toast("Login success");
  const failNotify = () => toast("Login Fail");
  const [userCredentials, setUserCredentials] = useState({});
  const { mutate, isLoading, isError, error } = useMutation(loginService, {
    onSuccess: async (data) => {
      console.log(data);
      const user = await jwt_decode(data?.accessToken);
      user.accessToken = data?.accessToken;
      user.refreshToken = data?.refreshToken;
      setUser(user);
      successNotify()
    },
    onError : ()=>{
      failNotify()
    }
  });
  const onSumbitHandler = (e) => {
    e.preventDefault();
    mutate(userCredentials);
  };
  return (
    <>
      <div
        style={{ ...centerDiv, alignItems: "center", flexDirection: "column" }}
      >
        <div style={centerDiv}>
          {isLoading && (
            <Loader type="Puff" color="#00BFFF" height={50} width={50} />
          )}
          {isError && (
            <p style={{ color: "red" }}>{error?.response?.data?.data}</p>
          )}
        </div>
        <div style={centerDiv}>
          <form onSubmit={onSumbitHandler}>
            <div style={centerDiv}>
              <input
                placeholder="username"
                name="username"
                onChange={(e) =>
                  setUserCredentials((user) => ({
                    ...user,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div style={centerDiv}>
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={(e) =>
                  setUserCredentials((user) => ({
                    ...user,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div style={centerDiv}>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
