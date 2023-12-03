import React from "react";
import PropTypes from "prop-types";

const CheckTopic = (props) => {
  return (
    <div className="fixed md:bottom-2 bottom-10 right-2 uppercase text-white md:text-2xl text-xl font-bold bg-preto">
      {props.topic}
    </div>
  );
};

CheckTopic.propTypes = {
  topic: PropTypes.string,
};

export default CheckTopic;
