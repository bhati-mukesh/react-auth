import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

export const MyContext = createContext();
const queryClient = new QueryClient();

const WrapperComponent = () => {
  const [user, setUser] = useState({});
  return (
    <>
    <MyContext.Provider value={{user, setUser}}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </MyContext.Provider>
    </>
  );
};

ReactDOM.render(<WrapperComponent />, document.getElementById("root"));
