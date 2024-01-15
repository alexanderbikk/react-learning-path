const fetchBreedList = async ({ queryKey }) => {
  const aminal = queryKey[1];

  if (!aminal) return [];
  
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${aminal}`
  );
  if (!apiRes.ok) {
    throw new Error(`breeds/${aminal} fetch is not working`);
  }

  return apiRes.json();
};

export default fetchBreedList;
