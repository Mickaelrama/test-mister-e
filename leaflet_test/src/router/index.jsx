import { useRoutes } from "react-router-dom";
import Homepage from "../views/Homepage";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);
};

export default Router;
