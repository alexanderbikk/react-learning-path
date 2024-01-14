import { useContext, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContex from "./AdoptedPetContex";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";

const animals = ["bird", "dog", "cat", "rabbit"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet, _] = useContext(AdoptedPetContex);
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? "",
    };
    startTransition(() => {
      // This operation starts immediately but is marked as a low-priority update.
      setRequestParams(obj);

      // While this operation is in progress, 'isPending' will be true.
      // React can interrupt this operation to prioritize more urgent updates,
      // keeping the UI responsive.
    });
  }
  return (
    <div className="search-params">
      <form onSubmit={(e) => handleSubmit(e)}>
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="location" />
        </label>
        <label htmlFor="animal">
          Amimal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {animals.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="animal">
          Breed
          <select id="breed" disabled={breeds.length === 0} name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        {
          // show something to user while 'transition' operation is not fully completed
          isPending ? (
            <div className="mini loading-pane">
              <h2 className="loader">Loader</h2>
            </div>
          ) : null
        }
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
