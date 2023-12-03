import React, { useEffect } from "react";
import PropTypes from "prop-types";

const SuccessNotification = ({ message, closeSuccessNotification }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      closeSuccessNotification();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="right-0 fixed top-40 w-auto p-5 bg-amarelo text-preto lg:text-xl text-lg z-[99999] rounded-l-full">
      {message}
    </div>
  );
};

SuccessNotification.propTypes = {
  message: PropTypes.string,
  closeSuccessNotification: PropTypes.func,
};

export default SuccessNotification;
