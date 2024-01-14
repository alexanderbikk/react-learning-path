import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContex from "./AdoptedPetContex";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoudary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("id missed");
  }
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContex);

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

  const pet = results?.data?.pets[0];
  if (!pet) {
    throw new Error("pet mised");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
              <div>Whould you like to adopt {pet.name}?</div>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoudary>
      <Details />
    </ErrorBoudary>
  );
}
export default DetailsErrorBoundary;
