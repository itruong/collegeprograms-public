import { umountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Main from "./Main";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
  act(() => {
    ReactDOM.render(<Main />, container)
  });
});