import React, { useContext } from "react";
import { Loader } from "@deposits/ui-kit-react";
import { AppContextInstance } from "../../store/appContext";

const LoaderLayout = ({ children }) => {
  const { loading } = useContext(AppContextInstance);

  return loading ? (
    <div className="my-auto bg-transparent">
      <Loader />
    </div>
  ) : (
    <>{children}</>
  );
};

export const LoaderComponent = ({ condition, small, white, children }) => {

  return !condition ? (
    <div className="w-max mx-auto">
      <Loader />
    </div>
  ) : (
    <>{children}</>
  );
};
export default LoaderLayout;
