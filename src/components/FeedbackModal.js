import React from "react";
import PropTypes from "prop-types";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useEmmeFeedbackMutation } from "../app/api";

const FeedbackModal = ({ setFeedbackModal, meem }) => {
  const [emmeFeedback] = useEmmeFeedbackMutation();
  const handleFeedback = async (feedback) => {
    await emmeFeedback({
      emme_id: meem,
      feedback: feedback,
    });
    setFeedbackModal();
  };
  return (
    <div className="bg-white rounded-xl absolute bottom-[100%] p-5 flex items-end gap-x-5 text-preto text-3xl z-[103] h-[100px]">
      <button
        onClick={() => setFeedbackModal()}
        className="absolute right-2 top-2 text-3xl text-preto z-[104]"
      >
        <RxCross2 />
      </button>
      <button
        onClick={() => handleFeedback(false)}
        className="hover:text-preto/50"
      >
        <BsFillHandThumbsDownFill />
      </button>
      <button
        onClick={() => handleFeedback(true)}
        className="hover:text-preto/50"
      >
        <BsFillHandThumbsUpFill />
      </button>
    </div>
  );
};

FeedbackModal.propTypes = {
  setFeedbackModal: PropTypes.func,
  meem: PropTypes.object,
};

export default FeedbackModal;
