import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="main-content-area flex-1 p-8 bg-gray-50 overflow-y-auto ">{children}</div>
      </div>
    </>
  );
};

export default Layout;
