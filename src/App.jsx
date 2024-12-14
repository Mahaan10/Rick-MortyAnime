import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import Modal, { FavList } from "./components/Modal";
import useLocalStorage from "./hooks/useLocalStorage";
import useCharacters from "./hooks/useCharacters";

function App() {
  const [value, setValue] = useState("");
  const [selectedId, setSelectedID] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const { isLoading, characters } = useCharacters(value);

  // useEffect Way & fetch data :

  /* useEffect(() => {
    setIsloading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => {
        if (!res.ok) throw new Error("Something went Wrong...");
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results.slice(0, 5));
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsloading(false));
  }, []); */

  // async await Way & fetch data :

  /* useEffect(() => {
    async function fetchData() {
      try {
        setIsloading(true);
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("Something went Wrong...");
        const data = await res.json();
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsloading(false);
      }
    }
    fetchData();
  }, []); */

  /* async await Way & axios */

  /*   useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsloading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${value}`,
          { signal }
        );
        // const { data } = await axios.get("https://rickandmortyapi.com/api/character");
        setCharacters(res.data.results.slice(0, 5));
        // setCharacters(data.results.slice(0, 5));
        return () => {};
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsloading(false);
      }
    }

    if (value.length < 3) {
      setCharacters([]);
      return;
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [value]); */

  /* useEffect Way & axios */

  /* useEffect(() => {
    setIsloading(true);
    axios.get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        setCharacters(res.data.results.slice(0, 5));
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => setIsloading(false));
  }, []); */

  const handleSelectCharacter = (id) => {
    setSelectedID((prevId) => (prevId === id ? null : id));
  };

  const addFavouriteHandler = (char) => {
    const addFav = favourites.some((item) => item.id === char.id);

    if (!addFav) {
      setFavourites((prevFav) => [...prevFav, char]);
    } else {
      setFavourites((prevFav) => [...prevFav]);
      toast.error(`${char.name} already added to favourite list!`);
    }
  };

  const handleFavRemove = (id) => {
    setFavourites((prevFav) => [...prevFav].filter((fav) => fav.id !== id));
  };

  const [favourites, setFavourites] = useLocalStorage("FAVLIST", []);

  return (
    <div className="container mx-auto min-[0px]:max-[625px]:w-11/12">
      <Toaster />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        favLength={favourites.length}
      >
        <FavList favourites={favourites} onRemove={handleFavRemove} />
      </Modal>
      <Navbar>
        <Search value={value} setValue={setValue} />
        <SearchResult numOfResult={characters.length} />
        <Favourites numOfFavs={favourites.length} setOpenModal={setOpenModal} />
      </Navbar>
      <div className="flex mt-2 gap-4 min-[0px]:max-[625px]:flex-col">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetails
          selectedId={selectedId}
          onAddFavourite={addFavouriteHandler}
        />
      </div>
    </div>
  );
}

export default App;
