import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListAPIResponce } from "./APIResponsesTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponce,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const aminal = queryKey[1];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${aminal}`
  );
  if (!apiRes.ok) {
    throw new Error(`breeds/${aminal} fetch is not working`);
  }

  return apiRes.json();
};

export default fetchBreedList;
