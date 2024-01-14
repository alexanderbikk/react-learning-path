import { FormEvent, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContex from "./AdoptedPetContex";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import { Animal } from "./APIResponsesTypes";

const animals : Animal[] = ["bird", "dog", "cat","reptile", "rabbit"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [adoptedPet, _] = useContext(AdoptedPetContex);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  function handleSubmit(e : FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj = {
      animal: formData.get("animal")?.toString() as Animal ?? ("" as Animal),
      breed: formData.get("breed")?.toString() ?? "",
      location: formData.get("location")?.toString() ?? "",
    };

    setRequestParams(obj);
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
              setAnimal(e.target.value as Animal);
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
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
