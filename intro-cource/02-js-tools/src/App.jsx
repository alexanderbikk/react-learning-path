import React from "react";
import { createRoot } from "react-dom/client";

const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h1", {}, props.anumal),
    React.createElement("h1", {}, props.bread),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt me"),
    React.createElement(Pet, { anumal: "dog", name: "luna", bread: "test" }),
    React.createElement(Pet, { anumal: "Bird", name: "luna", bread: "test2" }),
    React.createElement(Pet, { anumal: "Cat", name: "luna", bread: "test3" }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
