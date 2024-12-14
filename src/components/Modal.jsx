import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Modal({
  favLength,
  openModal,
  setOpenModal,
  children,
}) {
  return (
    <>
      {openModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-clip fixed inset-0 z-10 backdrop-blur-md">
            <div className="relative w-2/6 my-6 mx-auto">
              {/* Modal Content */}
              <div className="flex rounded-lg shadow-lg relative flex-col w-full bg-slate-600 text-white">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-200 py-2">
                  <h1 className="text-xl font-semibold ml-2">
                    Favourite List ({favLength === 0 ? setOpenModal(false) : favLength})
                  </h1>
                  <button
                    className="w-5 mr-1 text-rose-600"
                    onClick={() => setOpenModal(false)}
                  >
                    <XCircleIcon />
                  </button>
                </div>
                {/* Modal Body */}
                <div className="relative">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export const FavList = ({ favourites, onRemove }) => {
  return (
    <ul className="flex flex-col gap-2 list-none bg-inherit p-2">
      {favourites.map((fav) => (
        <FavInfo key={fav.id} fav={fav} onRemove={onRemove} />
      ))}
    </ul>
  );
};

function FavInfo({ fav, onRemove }) {
  return (
    <li className="flex justify-between items-center cursor-pointer bg-slate-700 rounded-xl hover:bg-slate-800">
      <div className="flex">
        <img src={fav.image} alt={fav.name} className="w-12 rounded-xl" />
        <div className="flex flex-col gap-1 ml-1">
          <p className="text-sm">
            {fav.gender === "Male" ? "👨🏻" : "👩🏻"}
            {fav.name}
          </p>
          <p className="text-xs">
            {fav.status === "Alive" ? "🟢" : "🔴"}
            {fav.status}-{fav.species}
          </p>
        </div>
      </div>
      <button
        className="w-4 text-red-600 mr-2"
        onClick={() => onRemove(fav.id)}
      >
        <TrashIcon />
      </button>
    </li>
  );
}
