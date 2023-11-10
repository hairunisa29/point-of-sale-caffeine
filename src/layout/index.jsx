import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}

export default Layout;
