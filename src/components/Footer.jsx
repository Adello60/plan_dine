const Footer = () => {
  return (
    <footer className="bg-[#30251D]  py-12">
      <div className="container">
        <div className=" grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#EE8130] ">Plan&Dine</h3>
            <p className="text-white">
              Main meal planning simple, healthy, and delicious for everyone.
            </p>
          </div>
          <div className="space-y-4 ">
            <h4 className="font-semibold text-white">Features</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>Meal Planning</li>
              <li>Recipe Discovery</li>
              <li>Grocery Lists</li>
              <li>Nutrition Tracking</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-8 text-sm text-[#ACA78C]">
          <p>
            &copy; {new Date().getFullYear()} Plan&Dine. All rights reserved.
          </p>
          <p>Made with ❤️ for healthy eating by adello.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
