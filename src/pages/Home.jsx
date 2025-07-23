import Layout from "../components/Layout";
import { CiCalendar } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";
import { IoMdTime } from "react-icons/io";
import imageOne from "../assets/hero-image.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "../components/Button";
import { features } from "../components/home";
import { allPaths } from "../routes/path";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative py-20 lg:py-32 bg-gradient-to-r from-[#338E25] to-[#AA8228]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Plan Your Meals, Simplify Your Life
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Get personalized meal plans, smart grocery lists, and nutrition
                tracking all in one place, tailored to your unique needs and
                goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 ">
                <div className="flex items-center">
                  <Link to={allPaths.meal_planner}>
                    <Button
                      text="Start Planning"
                      hasIcon={
                        <IoIosArrowRoundForward className=" group-hover:text-[2rem] transition-all duration-200" />
                      }
                      className="bg-white text-[#248F24] py-2.5 px-[2rem]  gap-[1rem] w-fit group"
                    />
                  </Link>
                </div>
                <Link to={allPaths.recipes}>
                  <Button
                    text="Browse Recipes"
                    className="bg-white py-2.5  text-[#248F24] w-fit
                  px-[2.6rem]"
                  />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <CiCalendar className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium">Weekly Planning</p>
                </div>
                <div className="text-center">
                  <LiaClipboardListSolid className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-white/90 font-medium">Smart Lists</p>
                </div>
                <div className="text-center">
                  <IoMdTime className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium">Saves Time</p>
                </div>
              </div>
            </div>
            <div className=" ">
              <img
                src={imageOne}
                alt=""
                className="w-full h-[400px] lg:h-[500px] rounded-[1rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="py-24 bg-[#F9FBF9] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Meal Success
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              From planning to shopping, we've got your entire meal journey
              covered
            </p>
          </div>

          <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center border-[2px] rounded-[10px] p-[1rem] border-[#D7EADE] cursor-pointer group"
                onClick={() => navigate(feature.path)}
              >
                <div>
                  <div className="mx-auto mb-4 p-3 bg-[#D0ECDB]/60 rounded-full w-fit group-hover:bg-[#D0ECDB] transition-colors">
                    <feature.icon className="h-8 w-8 text-[#16A249]" />
                  </div>
                  <div className="text-xl mb-2 font-[500] ">
                    {feature.title}
                  </div>
                  <div className="text-base text-gray-700 ">
                    {feature.description}
                  </div>
                </div>
                <div>
                  <Button
                    text="Get Started"
                    className="w-full py-2.5 px-[2rem]  group-hover:bg-[#16A249] mt-[2rem] border-[2px] border-[#D7EADE]  group-hover:text-white font-[500] justify-center transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Home;
