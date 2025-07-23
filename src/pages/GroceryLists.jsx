import Button from "../components/Button";
import Layout from "../components/Layout";
import { LuShoppingCart } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import bag from "../assets/premium_photo-1681487929886-4c16ad2f2387-removebg-preview.png";
import { GrPowerCycle } from "react-icons/gr";
import { LiaTimesSolid } from "react-icons/lia";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

const GroceryLists = () => {
  const [newItem, setNewItem] = useState("");
  const groceryListsRef = useRef(null);

  const [groceryItems, setGroceryItems] = useState(() => {
    const storedItems = localStorage.getItem("groceryItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [totalItems, setTotalItems] = useState(() => {
    const storedTotalItems = localStorage.getItem("totalItems");
    return storedTotalItems ? parseInt(storedTotalItems) : 0;
  });

  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(groceryItems));
    localStorage.setItem("totalItems", totalItems.toString());
  }, [groceryItems, totalItems]);

  const handleAddItem = () => {
    if (newItem.trim().toUpperCase() !== "") {
      setGroceryItems([...groceryItems, newItem]);
      setTotalItems(totalItems + 1);
      setNewItem("");
      toast.success(`${newItem} added to your list`, {
        position: "bottom-right",
      });
    }
  };

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleClearItems = () => {
    setGroceryItems([]);
    setTotalItems(0);
    toast.error("All items cleared from your list", {
      position: "bottom-right",
    });
  };

  const handleRemoveItem = (index) => {
    const item = groceryItems[index];
    const updatedGroceryItems = [...groceryItems];
    updatedGroceryItems.splice(index, 1);
    setGroceryItems(updatedGroceryItems);
    setTotalItems(totalItems - 1);
    toast.error(`${item} removed from your list`, {
      position: "bottom-right",
    });
  };

  const handleDownload = () => {
    try {
      html2canvas(groceryListsRef.current, {
        width: groceryListsRef.current.offsetWidth,
        height: groceryListsRef.current.offsetHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "grocery-list.png";
        link.click();
      });
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  return (
    <Layout>
      <div className="py-16 bg-[#F9FBF9] ">
        <div className="container">
          <div className="mb-8">
            <div>
              <div className="flex items-center gap-3">
                <LuShoppingCart className="h-8 w-8 text-[#16A249]" />
                <h1 className="text-3xl font-bold ">Grocery List</h1>
              </div>
              <p className="text-lg text-gray-700 pt-2 ">
                Make grocery shopping a breeze with lists created from your
                smart selections.
              </p>
            </div>
          </div>

          <div ref={groceryListsRef}>
            <div className="md:m-[3rem] m-[5px] ">
              <div className="md:flex justify-center gap-[1rem] ">
                <div className="pr-[2rem] pl-[10px] py-[1rem] my-[2rem] w-full basis-[20%] bg-[#E2F3DF] rounded-[10px] flex items-center gap-3">
                  <div className="p-2  rounded-lg">
                    <LuShoppingCart className="h-11 w-11 rounded-[5px] text-[#16A249] bg-[#CEEED1] p-2 " />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalItems}</p>
                    <p className="text-[1rem] ">Total Items</p>
                  </div>
                </div>
                <div className="bg-[#FFFFFF] w-full  px-[2rem] py-[1rem] my-[2rem]  border-[#E2E8F0] rounded-[10px] border-[1px]">
                  <h1 className="font-[600] text-[1.5rem] pb-[10px] ">
                    Add New Item
                  </h1>
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
                      placeholder="Add grocery item..."
                      className="pl-[1rem] py-[8px] border-[#E2E8F0] border rounded-[8px] bg-[#F9FBF9] w-full"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddItem();
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddItem}
                      hasIcon={<BiPlus className="mr-[5px]" />}
                      text="Add"
                      className={`${
                        isInputFocused ? "bg-[#21C45D]" : "bg-[#90E1AE]"
                      } text-white px-[1rem] font-[600]`}
                    />
                  </div>
                </div>
              </div>
              <div>
                {groceryItems.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px] ">
                    {groceryItems.map((item, index) => (
                      <li key={index} className="">
                        <p
                          key={index}
                          className="flex justify-between items-center pl-[1rem] py-[1rem] border-[#E2E8F0] border rounded-[8px] my-[1rem] bg-white hover:shadow-md w-full"
                        >
                          <span className="font-600 text-[1.2rem] ">
                            {item}
                          </span>
                          <LiaTimesSolid
                            className="text-[#E23636] hover:bg-[#FCEAEA] hover:rounded-[5px] p-[10px] text-[2.5rem] cursor-pointer mr-[5px] md:mr-[2rem]"
                            onClick={() => handleRemoveItem(index)}
                          />
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-[#FFFFFF] w-full text-center py-[2rem] mb-[2rem] border-[#E2E8F0] rounded-[10px] border-[1px]">
                    <div className="flex items-center justify-center">
                      <img src={bag} className="w-[8rem]" alt="" />
                    </div>
                    <p className="font-[600] text-[1.2rem] mb-[10px]">
                      Your list is empty
                    </p>
                    <p className="text-[#807883]">
                      Add your first grocery item to get started!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:flex  md:justify-between md:items-center">
            <Button
              onClick={handleClearItems}
              text="Clear All"
              hasIcon={<GrPowerCycle className="mr-[10px]" />}
              className="p-[10px] border-[#E2E8F0] border hover:bg-[#CCECC6] font-[600] mt-[1rem]"
            />
            <Button
              onClick={handleDownload}
              text="Download as Image"
              className="p-[10px] border-[#E2E8F0] border hover:bg-[#CCECC6] font-[600] my-[1rem]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default GroceryLists;
