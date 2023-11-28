import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AddToModal = ({ item }) => {
  useEffect(() => {
    if (item.type == "track") {
      console.log(item);
    } else if (item.type == "album") {
      console.log(item);
    } else if (item.type == "artist") {
      console.log(item);
    }
  }, [item]);
  return (
    <div className="z-[101] bg-white absolute top-4 right-3 w-auto h-auto flex p-3 pt-8 flex flex-col items-end text-[#2b2b2b] text-lg">
      {item.type == "track" && (
        <button className="w-full text-end hover:font-bold hover:underline">
          ADD TO CALENDAR
        </button>
      )}
      <button className="w-full text-end hover:font-bold hover:underline">
        ADD TO BOOKLET
      </button>
      <Link
        to={`/artist/${item.artists[0].id}`}
        className="w-full text-end hover:font-bold hover:underline"
      >
        GO TO ARTIST
      </Link>
      {(item.type == "track" || item.type == "album") && (
        <Link
          to={`/album/${item.album.id}`}
          className="w-full text-end hover:font-bold hover:underline"
        >
          GO TO ALBUM
        </Link>
      )}
    </div>
  );
};

AddToModal.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AddToModal;
