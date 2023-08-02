type Props = {
  handleChange: (arg: string) => void;
};

export default function SearchComponent({ handleChange }: Props) {
  return (
    <form className="max-w-full">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          title="Currently set to search on visible items only"
          type="text"
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Search for"
          className="w-full py-2.5 pl-12 pr-4 text-gray-100 rounded-md outline-none bg-gray-800 focus:bg-gray-700 focus:border-gray-600"
        />
      </div>
    </form>
  );
}
