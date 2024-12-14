import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <nav className="flex justify-between items-center rounded-2xl mt-5 bg-slate-800 py-4 relative">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

export function Search({ value, setValue }) {
  return (
    <form action="" className="">
      <input
        type="search"
        name=""
        id=""
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search..."
        className="bg-slate-700 rounded-lg px-3 py-1 text-white outline-none"
      />
    </form>
  );
}

export function SearchResult({ numOfResult }) {
  return <h2 className="text-white text-sm">Found {numOfResult} Results</h2>;
}

export function Favourites({ numOfFavs, setOpenModal }) {
  return (
    <div className="">
      <button
        className="text-red-600 mr-3 w-6"
        onClick={() => setOpenModal((is) => !is)}
      >
        <HeartIcon className="" />
      </button>
      <span className="absolute right-1 top-4 text-white text-xs font-bold rounded-full w-4 text-center bg-red-700">
        {numOfFavs}
      </span>
    </div>
  );
}

function Logo() {
  return <h1 className="text-white ml-3">Logo 😍</h1>;
}
