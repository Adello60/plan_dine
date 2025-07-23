import { GiFruitBowl } from "react-icons/gi";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { FiTarget } from "react-icons/fi";
import Button from "../components/Button";
import { addFood } from "../components/addFood";
import { LuUtensils } from "react-icons/lu";
import { BiMinus, BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";

const NutritionTracker = () => {
  const [inputNum, setInputNum] = useState("");
  const [newItem, setNewItem] = useState("");
  const [calroiesConsumed, setCalroiesConsumed] = useState(() => {
    const storedConsumed = localStorage.getItem("caloriesConsumed");
    return storedConsumed ? parseInt(storedConsumed) : 0;
  });
  const [calorieGoal, setCalorieGoal] = useState(() => {
    const storedGoal = localStorage.getItem("calorieGoal");
    return storedGoal ? parseInt(storedGoal) : 2000;
  });
  const storedFoods = localStorage.getItem("customFoods");
  const [customFoods, setCustomFoods] = useState(
    storedFoods ? JSON.parse(storedFoods) : []
  );

  const handleGoalChange = (e) => {
    const newGoal = parseInt(e.target.value);
    if (newGoal >= 1) {
      setCalorieGoal(newGoal);
    } else {
      setCalorieGoal(2000);
    }
  };

  const handleReset = () => {
    setCalorieGoal(2000);
    setCalroiesConsumed(0);
    setCustomFoods([]);
    toast(<div>All Foods Cleared. Starting Fresh</div>, {
      position: "bottom-right",
    });
  };

  const handleIncrement = (index, calories) => {
    setCalroiesConsumed((prevCalories) => prevCalories + calories);
    setCustomFoods(
      customFoods.map((food, i) =>
        i === index ? { ...food, counter: food.counter + 1 } : food
      )
    );
  };

  const handleDecrement = (index, calories) => {
    if (customFoods[index].counter > 1) {
      setCalroiesConsumed((prevCalories) => prevCalories - calories);
      setCustomFoods(
        customFoods.map((food, i) =>
          i === index ? { ...food, counter: food.counter - 1 } : food
        )
      );
    } else {
      handleRemoveFood(index, calories);
    }
  };

  const handleRemoveFood = (index, calories) => {
    setCalroiesConsumed((prevCalories) => prevCalories - calories);
    setCustomFoods(customFoods.filter((food, i) => i !== index));
    toast.error(
      <div>
        Food Removed
        <br />
        Item removed from your daily intake
      </div>,
      {
        position: "bottom-right",
      }
    );
  };

  const handleAddCustomFood = () => {
    const numToAdd = parseInt(inputNum);
    if (!isNaN(numToAdd) && newItem !== "") {
      setCalroiesConsumed((prevCalories) => prevCalories + numToAdd);
      setCustomFoods([
        ...customFoods,
        { name: newItem, counter: 1, calories: numToAdd },
      ]);
      setNewItem("");
      setInputNum("");
      toast.success(
        <div>
          Custom Food Added! <br />
          Added {newItem} ({inputNum}) cal
        </div>,
        {
          position: "bottom-right",
        }
      );
    } else {
      toast.error(
        <div>
          Missing Information <br />
          Please enter both food name and calories
        </div>,
        {
          position: "bottom-right",
        }
      );
    }
  };

  const addQuickFood = (food) => {
    setCalroiesConsumed((prevCalories) => prevCalories + food.calories);
    const existingFood = customFoods.find((f) => f.name === food.name);
    if (existingFood) {
      setCustomFoods(
        customFoods.map((f) =>
          f.name === food.name ? { ...f, counter: f.counter + 1 } : f
        )
      );
    } else {
      setCustomFoods([...customFoods, { ...food, counter: 1 }]);
    }
    toast.success(
      <div>
        Quick Food Added! <br />
        Added {food.name} ({food.calories}) cal
      </div>,
      { position: "bottom-right" }
    );
  };

  useEffect(() => {
    localStorage.setItem("caloriesConsumed", calroiesConsumed.toString());
  }, [calroiesConsumed]);

  useEffect(() => {
    localStorage.setItem("calorieGoal", calorieGoal.toString());
  }, [calorieGoal]);

  useEffect(() => {
    localStorage.setItem("customFoods", JSON.stringify(customFoods));
  }, [customFoods]);

  return (
    <Layout>
      <div className="py-16 bg-[#F9FBF9]">
        <div className="container">
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <GiFruitBowl className="h-8 w-8 text-[#16A249]" />
              <h1 className="text-3xl font-bold text-foreground">
                Calorie Click Tracker
              </h1>
            </div>
            <p className="text-lg text-gray-700 pt-2 ">
              Track your daily nutrition with simple clicks
            </p>
          </div>
          <div className="md:mx-[3rem]">
            <div className="border-[#E2E8F0] border rounded-[8px] p-[1rem] flex flex-col items-center bg-[#FDFEFD] w-full">
              <div className="flex items-center gap-[10px] mb-[1rem] ">
                <FiTarget className="text-[1.5rem]" />
                <h1 className="text-[24px] font-[500] ">Daily Progress</h1>
              </div>
              <p className="text-[2rem] text-[#338E25] font-[750] mb-[1rem] ">
                {calroiesConsumed} / {calorieGoal}
              </p>
              <div className="mx-auto w-full">
                <div className="h-[15px] bg-[#E4F1E4] mb-[1rem] rounded-full border border-gray-200 w-full">
                  <div
                    className="bg-green-500 h-[15px] rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (calroiesConsumed / calorieGoal) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <p className="font-[700] ">
                {calroiesConsumed <= calorieGoal ? (
                  <span className="text-[#338E25] ">
                    {calorieGoal - calroiesConsumed} calories remaining
                  </span>
                ) : (
                  <span className="text-[#E54A4A]">
                    {calroiesConsumed - calorieGoal} calories over goal
                  </span>
                )}
              </p>
              <div className="flex pt-[10px] gap-[8px]">
                <input
                  type="number"
                  className="text-center w-[7rem] bg-[#F9FBF9] font-[600] py-[6px] px-[10px] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2DAA5B]  "
                  value={calorieGoal}
                  onChange={handleGoalChange}
                />
                <Button
                  text="Reset Day"
                  onClick={handleReset}
                  className="bg-[#F9FBF9] font-[600] py-[6px] px-[10px] border-[#F0F5F0] border rounded-[8px] hover:bg-[#B4EB47] "
                />
              </div>
            </div>

            <div className="mt-8 border-[#E2E8F0] border rounded-[8px] p-[1rem] bg-[#FDFEFD] w-full">
              <div className="flex items-center gap-2 mb-[1.5rem]">
                <LuUtensils className="w-5 h-5" />
                <h2 className="text-[1.5rem] font-[600]">Quick Add Foods</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {addFood.map((food, index) => (
                  <button
                    key={index}
                    onClick={() => addQuickFood(food)}
                    className="h-auto flex flex-col gap-2 p-4 hover:bg-[#B4EB47] rounded-[5px] bg-[#F9FBF9] border-[2px] border-[#F0F5F0] transition-all"
                  >
                    <span className="text-2xl">{food.emoji}</span>
                    <span className="text-sm font-medium">{food.name}</span>
                    <p className="text-xs text-center hover:bg-[#DBF0C5] w-fit mx-auto bg-[#E4F1E4] py-[2px] px-[10px] rounded-full">
                      {food.calories} cal
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mt-8 border-[#E2E8F0] border rounded-[8px] p-[1rem] bg-[#FDFEFD] w-full">
                <div className="mb-[1.5rem]">
                  <h2 className="text-[1.5rem] font-[600]">Add Custom Foods</h2>
                </div>
                <div className="flex gap-[10px]">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) =>
                      setNewItem(
                        e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1)
                      )
                    }
                    placeholder="Food name"
                    className="pl-[1rem] py-[8px] border-[#F0F5F0] border rounded-[8px] bg-[#F9FBF9] w-full focus:outline-none focus:ring-2 focus:ring-[#2DAA5B] "
                  />
                  <input
                    type="number"
                    className=" pl-[1rem] border-[#F0F5F0] border bg-[#F9FBF9] w-[6rem] py-[10px] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2DAA5B] "
                    placeholder="Calories"
                    value={inputNum}
                    onChange={(e) => setInputNum(e.target.value)}
                    min={0}
                  />
                  <Button
                    onClick={handleAddCustomFood}
                    hasIcon={<BiPlus className="text-[#fff] text-[1.2rem] " />}
                    className="px-[8px] bg-[#2DAA5B] hover:bg-[#EE8130] "
                  />
                </div>
              </div>

              {customFoods.length > 0 && (
                <div className="mt-8 border-[#E2E8F0] border rounded-[8px] p-[1rem] bg-[#FDFEFD] w-full">
                  <div className="mb-[1.5rem]">
                    <h2 className="text-[1.5rem] font-[600]">Today's Intake</h2>
                  </div>
                  {customFoods.map((food, index) => (
                    <div
                      key={index}
                      className="md:flex md:items-center md:justify-between p-[1rem] border-[#F0F5F0] border rounded-[8px] bg-[#F9FBF9] mt-[1rem] w-full"
                    >
                      <div>
                        <p className="text-[1.2rem] font-[500] ">{food.name}</p>
                        <p>
                          {food.calories} cal x {food.counter} =
                          {food.calories * food.counter} cal
                        </p>
                      </div>
                      <div className="flex mt-[5px] md:mt-auto gap-[1rem] items-center">
                        <Button
                          onClick={() => handleDecrement(index, food.calories)}
                          hasIcon={
                            <BiMinus className=" text-[13px] md:text-[1.2rem] " />
                          }
                          className=" bg-[#F9FBF9] p-[1rem] border-[#F0F5F0] border rounded-[8px] hover:bg-[#B4EB47] "
                        />
                        <p className="font-[600] text-[1.3rem]">
                          {food.counter}
                        </p>
                        <Button
                          onClick={() => handleIncrement(index, food.calories)}
                          hasIcon={
                            <BiPlus className=" text-[13px] md:text-[1.2rem] " />
                          }
                          className=" bg-[#F9FBF9] p-[1rem] border-[#F0F5F0] border rounded-[8px] hover:bg-[#B4EB47] "
                        />
                        <Button
                          onClick={() =>
                            handleRemoveFood(
                              index,
                              food.calories * food.counter
                            )
                          }
                          text="Remove"
                          className="bg-[#E54A4A] text-white font-[700] md:text-[1.2rem] text-[13px] p-[10px] "
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NutritionTracker;
