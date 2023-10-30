import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 bg-gray-100">{children}</main>
    </div>
  );
}

export default Layout;
