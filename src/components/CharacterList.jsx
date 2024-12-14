import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharacterList({
  selectedId,
  characters,
  isLoading,
  onSelectCharacter,
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col w-2/5 mx-auto gap-6 min-[0px]:max-[625px]:w-full text-red-500 text-2xl">
        is Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col w-2/5 mx-auto gap-6 min-[0px]:max-[625px]:w-full">
      {characters.map((char) => (
        <CharacterLists
          selectedId={selectedId}
          key={char.id}
          char={char}
          onSelectCharacter={onSelectCharacter}
        />
      ))}
    </div>
  );
}

export default CharacterList;

function CharacterLists({ selectedId, char, onSelectCharacter }) {
  return (
    <div className="flex items-center justify-between bg-slate-700 rounded-xl text-white p-2 hover:bg-slate-600 cursor-pointer">
      <div className="flex gap-1">
        <img src={char.image} alt={char.name} className="w-12 rounded-xl" />
        <div className="flex flex-col gap-1">
          <p className="">
            {char.gender === "Male" ? "👨🏻" : "👩🏻"}
            {char.name}
          </p>
          <p className="text-xs">
            {char.status === "Alive" ? "🟢" : "🔴"}
            {char.status}-{char.species}
          </p>
        </div>
      </div>
      <button onClick={() => onSelectCharacter(char.id)}>
        {selectedId === char.id ? (
          <EyeSlashIcon className="text-white  w-4" />
        ) : (
          <EyeIcon className="text-red-600 w-4" />
        )}
      </button>
    </div>
  );
}
