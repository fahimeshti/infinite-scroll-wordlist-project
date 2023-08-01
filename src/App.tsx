import "./App.css";
import WordListContainer from "./components/WordListContainer";

function App() {
  return (
    <>
      <div className="bg-gray-800 flex flex-col items-center justify-center w-full h-screen py-12 px-32">
        {/* top heading */}
        <h1 className="text-gray-300 text-2xl font-semibold my-4">
          Infinite scroll word list by{" "}
          <a
            href="https://github.com/fahimeshti"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-yellow-600"
          >
            fahimeshti
          </a>
        </h1>
        {/* main container */}
        <WordListContainer />
      </div>
    </>
  );
}

export default App;
