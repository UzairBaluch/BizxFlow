import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="main-content-area flex-1 p-8">{children}</div>
      </div>
    </>
  );
};

export default Layout;
