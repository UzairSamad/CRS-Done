import React from "react";

import "../CustomInput/submit.css";

const SubmitButton = props => {
  return <input {...props} type="submit" className="submitButton"></input>;
};

export default SubmitButton;
