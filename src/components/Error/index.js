import React from "react";
import { DefaultErrorMessage } from "../../config/messages";

const Error = (props) => {
  return (
    <div className="error">
      {props.errorMsg !== "" ? props.errorMsg : { DefaultErrorMessage }}
    </div>
  );
};
export default Error;