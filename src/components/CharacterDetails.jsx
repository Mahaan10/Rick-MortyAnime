import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function CharacterDetails({ selectedId, onAddFavourite }) {
  const [char, setChar] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchChar() {
      try {
        setIsloading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setChar(response.data);
        // get Episodes id
        const episodesID = response.data.episode.map((e) =>
          e.split("/").at(-1)
        );

        const episodesRes = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesID}`
        );
        setEpisodes([episodesRes.data].flat().slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsloading(false);
      }
    }

    if (selectedId) fetchChar();
  }, [selectedId, setChar, setIsloading, setEpisodes]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-3/5 mx-auto gap-6 text-white min-[0px]:max-[625px]:w-full text-xl">
        is loading ...
      </div>
    );
  }

  if (!char || !selectedId) {
    return (
      <div className="flex flex-col w-3/5 mx-auto gap-6 min-[0px]:max-[625px]:w-full text-red-500 text-xl">
        Please Select a Character!!
      </div>
    );
  }

  return (
    <div className="flex flex-col w-3/5 mx-auto gap-6 text-white min-[0px]:max-[625px]:w-full">
      <CharacterInfo
        key={char.id}
        char={char}
        onAddFavourite={onAddFavourite}
        selectedId={selectedId}
      />
      <EpisodesList episodes={episodes} />
    </div>
  );
}

export default CharacterDetails;

function EpisodesList({ episodes }) {
  const [sort, setSort] = useState(true);

  let sortedEpisodes;
  if (sort) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created - new Date(b.created))
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="flex flex-col gap-2 px-2 pb-2 bg-slate-800 rounded-xl">
      <div className="flex justify-between">
        <h1 className="text-slate-600 text-xl font-bold">List of Episodes:</h1>
        <button onClick={() => setSort((is) => !is)}>
          {sort ? (
            <ArrowDownCircleIcon className="w-5 text-slate-400" />
          ) : (
            <ArrowUpCircleIcon className="w-5 text-slate-400" />
          )}
        </button>
      </div>
      <ul className="text-sm list-none flex flex-col gap-3">
        {sortedEpisodes.map((item, index) => (
          <Episode key={item.id} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
}

function CharacterInfo({ char, onAddFavourite }) {
  return (
    <div className="flex items-center bg-slate-800 rounded-md  pr-2">
      <img
        src={char.image}
        alt={char.name}
        className="w-36 h-full rounded-l-md"
      />
      <div className="flex flex-col gap-2 ml-2">
        <div className="">
          <p className="">
            {char.gender === "Male" ? "👨🏻" : "👩🏻"}
            {char.name}
          </p>
          <p className="text-xs">
            {char.status === "Alive" ? "🟢" : "🔴"}
            {char.status}-{char.species}
          </p>
        </div>
        <div className="text-xs">
          <p className="opacity-50">Last Known Location:</p>
          <p className="font-bold text-sm">{char.location.name}</p>
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-slate-500  rounded-full text-xs font-bold px-2 py-1 hover:bg-slate-400 hover:text-black"
            onClick={() => onAddFavourite(char)}
          >
            Add to Favorite
          </button>
        </div>
      </div>
    </div>
  );
}

function Episode({ item, index }) {
  return (
    <li className="flex justify-between items-center text-xs">
      <div className="flex items-center">
        <p className="">
          {String(index + 1).padStart(2, "0")}.&nbsp;{item.episode}:
        </p>
        <span className="text-xs font-bold">&nbsp;{item.name}</span>
      </div>
      <div className="bg-slate-600 px-1 rounded-md font-bold">
        <p className="">{item.air_date}</p>
      </div>
    </li>
  );
}
