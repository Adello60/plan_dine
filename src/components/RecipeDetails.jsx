import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { toast } from "react-toastify";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        toast.error(`${error}`, {
          position: "bottom-right",
        });
      }
    };
    fetchRecipe();
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-[10px] bg-[#F9FBF9] py-[3rem] px-[1rem] md:px-[6rem] ">
          <div>
            <h1 className="text-[2.5rem] leading-[3rem] font-[700]">
              {recipe.name}
            </h1>
            <div className="py-[1rem] flex gap-[1rem]">
              <div>
                <p className="text-[1rem]">Prep</p>
                <p className="text-[1rem] font-[500]">
                  {recipe.prepTimeMinutes}min
                </p>
              </div>
              <div className="border-x-2 px-[1.2rem] ">
                <p className="text-[1rem]">Cook</p>
                <p className="text-[1rem] font-[500]">
                  {recipe.cookTimeMinutes}min
                </p>
              </div>
              <div>
                <p className="text-[1rem]">Serves</p>
                <p className="text-[1rem] font-[500]">{recipe.servings}</p>
              </div>
            </div>
            <p className="text-[1.2rem] font-[700] pb-[7px]">
              Ingredients ({recipe.ingredients?.length})
            </p>
            <ul className="list-disc list-inside leading-[3rem]">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <p className="py-[1rem] font-bold">Cuisine: {recipe.cuisine}</p>
          </div>
          <div>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="md:w-[40rem] md:h-[30rem] rounded-[10px] "
            />

            <p className="text-[1.5rem] py-[10px] font-[700]">
              Instructions ({recipe.instructions?.length || 0})
            </p>
            {recipe.instructions?.map((instruction, index) => (
              <p
                key={index}
                className="mt-[2rem] p-[10px] leading-[2rem] overflow-hidden hover:shadow-lg transition-shadow duration-300 border-[3px] rounded-[1rem] "
              >
                <span style={{ fontWeight: "bold" }}>
                  <p>Step {index + 1}</p>
                </span>
                {instruction}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetails;
