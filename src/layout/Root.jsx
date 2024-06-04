import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/NavBar";

const Root = () => {
  return (
    <>
      <NavBar></NavBar>
      <main className="dark:bg-gray-900 min-h-[calc(100vh-82px)]">
          <Outlet></Outlet>
      </main>
    </>
  );
};

export default Root;