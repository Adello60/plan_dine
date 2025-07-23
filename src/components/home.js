import { RiCalendarCheckLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { GiFruitBowl } from "react-icons/gi";
import { allPaths } from "../routes/path";

export const features = [
  {
    icon: FiUser,
    title: "Recipe Discovery",
    description:
      "Discover thousands of recipes tailored to your dietary preferences.",
    path: allPaths.recipes,
  },
  {
    icon: RiCalendarCheckLine,
    title: "Smart Meal Planning",
    description:
      "Plan your meals for the week with our intuitive meal planning tool.",
    path: allPaths.meal_planner,
  },
  {
    icon: LuShoppingCart,
    title: "Auto Grocery Lists",
    description: "Generate smart shopping lists based on your meal plans.",
    path: allPaths.grocery_lists,
  },
  {
    icon: GiFruitBowl,
    title: "Nutrition Tracking",
    description:
      "Track your daily nutrient intake and stay on top of your health goals.",
    path: allPaths.nutrition_tracker,
  },
];
