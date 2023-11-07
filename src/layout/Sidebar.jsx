import { Link, useNavigate } from "react-router-dom";
import { sidebarData } from "../data/Static";

function Sidebar() {

  const navigate = useNavigate();

  const onClickMenu = (url) => {

    navigate(url);
  };

  return (
    <div className="sticky top-0 flex flex-col items-center bg-white text-gray-700 shadow h-screen">
      <div className="h-16 flex items-center w-full">
        <Link className="h-6 w-6 mx-auto" to="/">
          <img className="h-6 w-6 mx-auto" src="caffeine-logo.svg" alt="logo" />
        </Link>
      </div>

      <ul>
        {sidebarData.map((menu) => (
          <li
            key={menu.id}
            className={`h-16 px-6 flex justify-center items-center w-full ${
              window.location.pathname === menu.url ? "text-[#e55644]" : ""
            } hover:bg-gray-100 cursor-pointer`}
            onClick={() => onClickMenu(menu.url)}
          >
            <menu.icon className="h-5 w-5" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
