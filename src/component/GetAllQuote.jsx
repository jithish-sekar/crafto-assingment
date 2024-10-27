import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import Pagination from "./Pagination";

const GetAllQuote = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(20);
  const [offSet, setOffSet] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchAllQuote = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("no authentication token found");
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offSet}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData(response.data.data);
      setHasMore(response.data.data.length >= limit);
    } catch (error) {
      throw new Error("fetching quote failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setOffSet((prev) => prev + limit);
    }
  };
  const handlePreviousePage = () => {
    if (offSet > 0) setOffSet((prevOffset) => prevOffset - limit);
  };

  useEffect(() => {
    fetchAllQuote();
  }, [offSet]);

  if (!data) return;
  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <div className="relative flex justify-center">
        <Link to="/create-new-quote">
          {" "}
          <button className="flex items-center absolute right-20 max-sm:right-3 bottom-0 gap-2 py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            {" "}
            Create New{" "}
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/add--v1.png"
              alt="add--v1"
            />
          </button>
        </Link>
      </div>
      <h3 className="text-center text-4xl mt-20">Getting all Quotes</h3>

      <div className="flex flex-wrap m-10">
        {data.map((allQuotes) => {
          return (
            <div
              key={allQuotes.id}
              className="bg-white  m-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full max-w-sm rounded-lg foverflow-hidden mx-auto mt-4"
            >
              <CardComponent allQuotes={allQuotes} />
            </div>
          );
        })}
      </div>
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousePage={handlePreviousePage}
        offSet={offSet}
        hasMore={hasMore}
      />
    </>
  );
};

export default GetAllQuote;
