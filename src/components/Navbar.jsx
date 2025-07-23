import { useState } from "react";
import { IoMdRestaurant } from "react-icons/io";
import { GiHamburger } from "react-icons/gi";
import Button from "./Button";
import { allPaths } from "../routes/path";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);

  function toggle() {
    setToggleNav(!toggleNav);
  }

  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur bg-white bg-opacity-50 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={allPaths.home}
            className="text-2xl font-bold text-[#2C9D2C]"
          >
            Plan&Dine
          </Link>
        </div>
        <div
          className={`flex md:flex-row md:items-center ${
            toggleNav ? "flex flex-col" : "hidden"
          } md:flex absolute md:static right-8 rounded-[10px] top-[64px] p-[1rem] md:p-0 md:w-auto bg-white justify-center gap-[2rem] md:gap-2 text-center md:bg-transparent`}
        >
          {[
            {
              name: "Home",
              to: allPaths.home,
            },
            {
              name: "Recipes",
              to: allPaths.recipes,
            },
            {
              name: "Meal Plan",
              to: allPaths.meal_planner,
            },
            {
              name: "Grocery List",
              to: allPaths.grocery_lists,
            },
            {
              name: "Nutrition Tracker",
              to: allPaths.nutrition_tracker,
            },
          ].map((data, i) => (
            <p key={i} className="font-[500] ">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-[#2DAA5B] px-[1rem] py-[8px] rounded-[5px] "
                    : "hover:bg-[#EE8130] hover:text-white px-[1rem] py-[8px] rounded-[5px]  "
                }
                to={data.to}
              >
                {data.name}
              </NavLink>
            </p>
          ))}
        </div>
        <Button
          className="text-2xl text-[#2C9D2C] block md:hidden"
          onClick={toggle}
          hasIcon={toggleNav ? <IoMdRestaurant /> : <GiHamburger />}
        />
      </div>
    </div>
  );
};
export default Navbar;
