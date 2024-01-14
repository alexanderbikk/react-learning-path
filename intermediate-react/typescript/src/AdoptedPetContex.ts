import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContex = createContext<[Pet, (adoptedPet: Pet) => void]>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    desciption: "Test",
    breed: "Beagle",
    images: [],
    city: "Seattle",
    state: "WA",
  },
  () => {},
]);

export default AdoptedPetContex;