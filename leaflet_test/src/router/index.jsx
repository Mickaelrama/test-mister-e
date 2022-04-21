import { useRoutes } from "react-router-dom";
import Homepage from "../views/Homepage";
import QuiNousSommes from "../views/QuiNousSommes";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/about-us",
      element: <QuiNousSommes />,
    },
  ]);
};

export default Router;
