import Button from "../components/Button";
import { Link } from "react-router-dom";
import { allPaths } from "../routes/path";

const Error = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-6 justify-center items-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62v4zY-fCDx0HywpZwHZoP6kLeVUwkHiWiQ&s"
        alt=""
        className="w-full"
      />
      <Link to={allPaths.home}>
        <Button
          text="Go Home"
          className="w-full py-2.5 px-[2rem]  bg-[#16A249] hover:bg-[#EE8130] border-[2px] border-[#D7EADE]  hover:text-white font-[500] justify-center transition-colors"
        />
      </Link>
    </div>
  );
};

export default Error;
