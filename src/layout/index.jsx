import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="container">{children}</main>
    </div>
  );
}

export default Layout;
