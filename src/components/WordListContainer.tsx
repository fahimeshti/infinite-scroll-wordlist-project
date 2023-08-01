import { useEffect, useState, useRef } from "react";
import SearchComponent from "./SearchComponent";

function WordListContainer() {
  const [wordData, setWordData] = useState<string[]>([]);
  const [visibleWordData, setVisibleWordData] = useState<string[]>([]);
  const [searchedData, setSearchedData] = useState<string[]>([]);
  const [searchedQuery, setSearchedQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const myRef = useRef<any>();

  // scroll function
  const handelInfiniteScroll = async () => {
    try {
      if (
        // load data when 50px above from bottom
        myRef.current.scrollTop + myRef.current.offsetHeight + 50 >=
        myRef.current.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {}
  };

  // add EventListener
  useEffect(() => {
    myRef.current.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  // read text file
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
    )
      .then((res) => res.text())
      .then((text) => {
        // convert to array of words
        const data = text.split("\r\n");
        // save to state
        setWordData(data);
        // stop loading
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  // set initial visible data
  useEffect(() => {
    wordData?.length > 0 && setVisibleWordData([...wordData]?.slice(0, 25));
  }, [wordData]);

  useEffect(() => {
    if (page > 1 && page < 14804) {
      const moreWords = [...wordData].slice(
        visibleWordData?.length,
        visibleWordData?.length + 25
      );
      setVisibleWordData((prevWords) => [...prevWords, ...moreWords]);
    }
  }, [page]);

  // search function handler
  function handleChange(query: string) {
    const queryData = [...visibleWordData].filter((word) =>
      word
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
    );
    // save search result
    setSearchedData(queryData);
    // save search query
    setSearchedQuery(query);
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 rounded">
      {/* searchbox */}
      <div className="sticky top-0 p-8 pb-4">
        <SearchComponent handleChange={handleChange} />
      </div>
      {/* word container */}
      <div
        className="w-full h-full p-8 pt-2 rounded overflow-y-auto"
        ref={myRef}
      >
        {/* inner container */}
        <div className="h-auto relative">
          {/* loading message */}
          {loading && (
            <p className="text-gray-400 py-4 text-center font-medium">
              Loading...
            </p>
          )}
          {/* list */}
          <ul className="space-y-2">
            {(searchedQuery?.length > 0 ? searchedData : visibleWordData).map(
              (item, idx) => (
                <li
                  key={idx}
                  className="bg-gray-600 bg-opacity-50 p-2 px-4 text-gray-50 rounded"
                >
                  {item}
                </li>
              )
            )}
            {/* empty message */}
            {searchedQuery?.length > 0 && searchedData?.length <= 0 && (
              <p className="text-gray-400 py-32 text-center font-medium">
                No such word found.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WordListContainer;
