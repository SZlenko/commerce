import {
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} />
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
