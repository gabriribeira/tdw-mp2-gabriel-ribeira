import React from "react";
import PropTypes from "prop-types";

const HomepageSlider = (props) => {
  const data = props.data;
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
      {data &&
        data.items.map((item) => (
          <button
            key={item.track.id}
            className="flex flex-col col-span-1 group relative"
          >
            <div className="group-hover:block hidden transition-all duration-[0.2s] absolute hidden w-full h-full p-5 z-[100]">
              <div className="flex flex-col items-start font-bold text-2xl text-left">
                <p>{item.track.name}</p>
                <p>{item.track.artists[0].name}</p>
              </div>
            </div>
            <img
              src={item.track.album.images[0].url}
              alt={item.track.album.name}
              className="group-hover:opacity-50 transition-all duration-[0.2s]"
            />
          </button>
        ))}
    </div>
  );
};

HomepageSlider.propTypes = {
  data: PropTypes.object,
};

export default HomepageSlider;
