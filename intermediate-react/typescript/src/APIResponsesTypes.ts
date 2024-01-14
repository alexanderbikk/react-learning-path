export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  desciption: string;
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
