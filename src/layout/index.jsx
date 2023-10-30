import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
