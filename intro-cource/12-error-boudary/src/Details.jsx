import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoudary from "./ErrorBoundary";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  //throw new Error("Test error boundery");
  if (results.isError) {
    return <div>Erorr...</div>;
  }
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">0</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoudary>
      <Details {...props} />
    </ErrorBoudary>
  );
}
export default DetailsErrorBoundary;
