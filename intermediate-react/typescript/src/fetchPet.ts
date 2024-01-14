import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponce } from "./APIResponsesTypes";

const fetchPet: QueryFunction<PetAPIResponce, ["details", string]> = async ({
  queryKey,
}) => {
  console.log(queryKey);
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch is not working`);
  }

  return apiRes.json();
};

export default fetchPet;
