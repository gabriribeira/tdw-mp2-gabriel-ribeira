import React, { useState, useEffect } from "react";
import { useGetSearchQuery } from "../app/spotifyApi";
import Navbar from "../components/Navbar";
import SearchResults from "../components/SearchResults";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [search, setSearch] = useState("");
  const { data: results, error, isLoading } = useGetSearchQuery(search);

  useEffect(() => {
    if (results) {
      console.log(results);
    }
    if (error) {
      console.error("Error fetching results:", error);
    }
  }, [results, error]);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="relative flex sticky xl:top-[10vh] lg:top-[7vh] md:top-[5vh] top-[4vh] z-[90] overflow-hidden">
        <input
          type="text"
          className="w-full border-b-2 border-b-[#2b2b2b] bg-white text-lg focus:outline-none mt-5 md:px-20 pl-10 text-[#2b2b2b] placeholder:text-[#2b2b2b]/50 pt-5"
          placeholder="SEARCH FOR ARTIST, ALBUM, TRACK, USER..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className="text-4xl absolute left-1 md:left-10 bottom-0">
          <CiSearch />
        </div>
      </div>
      {!isLoading && results && <SearchResults data={results} />}
    </div>
  );
};

export default Search;
