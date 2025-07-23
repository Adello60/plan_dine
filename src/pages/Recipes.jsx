import Layout from "../components/Layout";
import { FiUser } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import { FaFire } from "react-icons/fa6";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [pizza, setPizza] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [favourites, setFavourites] = useState([]);

  const filterTags = [
    "All",
    "Breakfast",
    "Beverage",
    "Chicken",
    "Dinner",
    "Lunch",
    "Snack",
    "Favourites",
  ];

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        if (!response.ok) {
          throw new Error("problemmmmmmm");
        }
        const result = await response.json();
        setPizza(result.recipes || result);
      } catch (error) {
        toast.error(`${error}`, { position: "bottom-right" });
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (selectedTag === "Favourites") {
      setFilteredRecipes(favourites);
      setVisibleRecipes(favourites.slice(0, 20));
      setShowLoadMore(favourites.length > 20);
    } else {
      const result = pizza.filter((recipe) => {
        const matchesTag =
          selectedTag === "All" ||
          (recipe.tags &&
            recipe.tags.some((tag) =>
              tag.toLowerCase().includes(selectedTag.toLowerCase())
            )) ||
          (recipe.mealType &&
            recipe.mealType.some((mealType) =>
              mealType.toLowerCase().includes(selectedTag.toLowerCase())
            ));
        const matchesSearch =
          !searchQuery ||
          `${recipe.name} ${recipe.cuisine} ${recipe.tags.join(
            " "
          )} ${recipe.mealType.join(" ")} ${recipe.ingredients.join(" ")}`
            .toLowerCase()
            .includes(searchQuery);
        return matchesTag && matchesSearch;
      });
      setFilteredRecipes(result);
      setVisibleRecipes(result.slice(0, 20));
      setShowLoadMore(result.length > 20);
    }
  }, [pizza, selectedTag, searchQuery, favourites]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleAddFavourites = (recipe) => {
    if (!favourites.some((fav) => fav.id === recipe.id)) {
      const newFavourites = [...favourites, recipe];
      setFavourites(newFavourites);
      toast.success(`${recipe.name} added to your Favourites`, {
        position: "bottom-right",
      });
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    } else {
      const newFavourites = favourites.filter((fav) => fav.id !== recipe.id);
      setFavourites(newFavourites);
      toast.error(`${recipe.name} removed from your Favourites`, {
        position: "bottom-right",
      });
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    const currentVisibleRecipes = visibleRecipes.length;
    const newVisibleRecipes = filteredRecipes.slice(
      0,
      currentVisibleRecipes + 20
    );
    setVisibleRecipes(newVisibleRecipes);
    setShowLoadMore(newVisibleRecipes.length < filteredRecipes.length);
  };

  return (
    <Layout>
      <div className="py-16 bg-[#F9FBF9] ">
        <div className="container">
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <FiUser className="h-8 w-8 text-[#16A249]" />
              <h1 className="text-3xl font-bold text-foreground">
                Recipe Collection
              </h1>
            </div>
            <p className="text-lg text-gray-700 pt-2 ">
              Explore our collection of healthy, delicious recipes perfect for
              any occasion.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative flex-1 max-w-md">
              <IoSearch className="absolute left-3 top-1/2 transform text-[#847062] -translate-y-1/2 h-4 w-4" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 py-[5px] w-full border border-[#EFEBE7] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-[#248F40]"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-8 bg-background rounded-lg pt-4">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  className={`cursor-pointer p-[2px] px-[7px] font-[500] rounded-[7px] transition-colors ${
                    selectedTag === tag
                      ? "bg-[#248F40] text-white"
                      : "bg-white border hover:bg-[#EE8130] hover:text-white"
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {visibleRecipes.map((meal, index) => (
              <div
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-[3px] rounded-[1rem] "
              >
                <div className="p-3">
                  <div className="flex items-start justify-between mb-3">
                    <img
                      src={meal.image}
                      alt=""
                      className="w-[9rem] rounded-[3rem]"
                    />
                    <p className="bg-[#E53E3E] rounded-[1rem] text-white font-bold px-[5px] py-[1px] flex items-center gap-[5px]">
                      <FaFire className="text-yellow-600" /> {meal.cuisine}
                    </p>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {meal.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meal.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-[#F1F5F9] font-bold text-[12px] px-[10px] rounded-[1rem]"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {meal.ingredients.length > 3 && (
                      <span className="bg-[#F1F5F9] font-bold text-[12px] px-[10px] rounded-[1rem]">
                        {" "}
                        +{meal.ingredients.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 text-[#FBBF24]" />
                      <span>{meal.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CiClock1 className="w-4 h-4" />
                      <span>
                        {meal.prepTimeMinutes + meal.cookTimeMinutes} -
                        {meal.prepTimeMinutes + meal.cookTimeMinutes + 4} min
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Link to={`/recipes/${meal.id}`} className="w-full">
                      <Button
                        text="View Dish"
                        className="w-full py-2.5 px-[2rem]  bg-[#16A249] hover:bg-[#EE8130] mt-[2rem] border-[2px] border-[#D7EADE]  hover:text-white font-[500] justify-center transition-colors"
                      />
                    </Link>
                    <Button
                      text={
                        favourites.some((fav) => fav.id === meal.id) ? "-" : "+"
                      }
                      onClick={() => handleAddFavourites(meal)}
                      className="px-[10px] justify-center mt-[2rem] font-[600] border-[2px] backdrop-blur bg-white bg-opacity-50 hover:bg-[#FFEEE6] border-[#D7EADE] w-fit text-[2rem]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showLoadMore && (
            <div className="flex pt-10 justify-center">
              <Button
                text="Load More Recipes"
                className="w-fit py-2.5 px-[2rem] bg-[#16A249] hover:bg-[#EE8130] border-[2px] border-[#D7EADE] hover:text-white font-[500] justify-center transition-colors"
                onClick={handleLoadMore}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Recipes;
