// it requires to run typescipt folder from the root in VS code then the issues is gone, if we run open it from higher dierectory esling can't find the tsconfig file for some reason
export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponce {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}

export interface BreedListAPIResponce {
  animal: Animal;
  breeds: string[];
}
