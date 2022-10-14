import { Suspense } from "react";
import logo from "./logo.svg";
import "./App.less";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

function App():JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
