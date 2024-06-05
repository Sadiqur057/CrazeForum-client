import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/NavBar";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  return (
    <>
      <NavBar></NavBar>
      <ToastContainer />
      <main className="dark:bg-gray-900 min-h-[calc(100vh-82px)]">
          <Outlet></Outlet>
      </main>
    </>
  );
};

export default Root;