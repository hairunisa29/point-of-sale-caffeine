import { Link, useNavigate } from "react-router-dom";
import { sidebarData } from "../data/Static";
import { useState } from "react";

function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const navigate = useNavigate();

  const onClickMenu = (index, url) => {
    setSelectedMenu(index);
    navigate(url);
  };

  return (
    <div className="flex flex-col items-center bg-white text-gray-700 shadow h-screen">
      <div className="h-16 flex items-center w-full">
        <Link className="h-6 w-6 mx-auto" to="/">
          <img className="h-6 w-6 mx-auto" src="caffeine-logo.svg" alt="logo" />
        </Link>
      </div>

      <ul>
        {sidebarData.map((menu, index) => (
          <li
            key={menu.id}
            className={`h-16 px-6 flex justify-center items-center w-full ${
              selectedMenu === index ? "text-[#e55644]" : ""
            } hover:bg-gray-100 cursor-pointer`}
            onClick={() => onClickMenu(index, menu.url)}
          >
            <menu.icon className="h-5 w-5" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
