import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { RiCalendarCheckLine } from "react-icons/ri";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";

const MealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  const [meals, setMeals] = useState(() => {
    const storedMeals = localStorage.getItem("meals");
    return storedMeals ? JSON.parse(storedMeals) : {};
  });

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  const mealPlanRef = useRef(null);

  const getWeekDates = () => {
    const startOfWeek = new Date(currentWeek);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    return days.map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const handleClearWeek = () => {
    setMeals([]);
    toast.error("All plans cleared from your week", {
      position: "bottom-right",
    });
  };

  const handleDownload = () => {
    try {
      html2canvas(mealPlanRef.current, {
        width: mealPlanRef.current.offsetWidth,
        height: mealPlanRef.current.offsetHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "meal-plan.png";
        link.click();
      });
    } catch (error) {
      console.error("error capturiong image", error);
    }
  };

  return (
    <Layout>
      <div className="py-16 bg-[#F9FBF9] ">
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <RiCalendarCheckLine className="h-8 w-8 text-[#16A249]" />
              <h1 className="text-3xl font-bold">Weekly Meal Planner</h1>
            </div>
            <p className="text-lg text-gray-700 pt-2 ">
              Organize your meals for the week and automatically generate your
              meal plan.
            </p>
          </div>

          <div className="flex items-center justify-between mb-8 rounded-[10px] pb-4 ">
            <Button
              text="Previous Week"
              onClick={goToPreviousWeek}
              className="border-[2px] border-[#D7EADE] hover:text-white hover:bg-[#EE8130] py-1.5 px-[10px] font-[500]"
            />
            <h2 className=" font-[500]">
              {weekDates[0].toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              <b className="font-[900]"> ---- </b>
              {weekDates[6].toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
            <Button
              text="Next Week"
              onClick={goToNextWeek}
              className="border-[2px] border-[#D7EADE] hover:text-white hover:bg-[#EE8130] py-1.5 px-[10px] font-[500]"
            />
          </div>

          <div
            className="grid grid-cols-1 p-[1.5rem] md:grid-cols-2 lg:grid-cols-3  gap-4"
            ref={mealPlanRef}
          >
            {days.map((day, index) => (
              <div
                key={day}
                className=" border-[#D7EADE] border-2 p-3 rounded-lg "
              >
                <div className="pb-3 ">
                  <div className="text-lg font-[500] text-center">{day}</div>
                  <div className="text-center text-[#A9A3B7]">
                    {weekDates[index].toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="space-y-3 ">
                  {mealTypes.map((mealType) => (
                    <div
                      key={mealType}
                      className="border-2 border-dashed rounded-lg p-4 bg-[#FFFFFF] min-h-20 hover:border-[#16A266] transition-colors group cursor-pointer "
                    >
                      <div className="text-sm text-[#A9A3B7] font-medium mb-2">
                        {mealType}
                      </div>
                      <input
                        type="text"
                        value={meals[`${index}-${mealType}`] || ""}
                        onChange={(e) =>
                          setMeals((prevMeals) => ({
                            ...prevMeals,
                            [`${index}-${mealType}`]:
                              e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1),
                          }))
                        }
                        placeholder="Add meal"
                        className="text-[1.1rem] font-[600] w-full p-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A266]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              className="bg-[#FFFFFF] border-[#D7EADE] border-2  hover:text-white hover:bg-[#EE8130] py-1.5 px-[10px] font-[500] "
              text="Clear Week"
              onClick={handleClearWeek}
            />
            <Button
              className="bg-[#FFFFFF] border-[#D7EADE] border-2  hover:text-white hover:bg-[#EE8130] py-1.5 px-[10px] font-[500] "
              text="Download Plan"
              onClick={handleDownload}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MealPlanner;
