import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { allPaths } from "./routes/path";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import MealPlanner from "./pages/MealPlanner";
import GroceryLists from "./pages/GroceryLists";
import NutritionTracker from "./pages/NutritionTracker";
import RecipeDetails from "./components/RecipeDetails";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: allPaths.home,
    element: <Home />,
  },
  {
    path: allPaths.recipes,
    element: <Recipes />,
  },
  {
    path: allPaths.meal_planner,
    element: <MealPlanner />,
  },
  {
    path: allPaths.grocery_lists,
    element: <GroceryLists />,
  },
  {
    path: allPaths.nutrition_tracker,
    element: <NutritionTracker />,
  },
  {
    path: "/recipes/:id",
    element: <RecipeDetails />,
  },

  {
    path: "*",
    element: <Error />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </BrowserRouter>
// );

// reportWebVitals();
