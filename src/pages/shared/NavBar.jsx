import { useEffect, useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import { toast } from "react-toastify";
// import "react-tooltip/dist/react-tooltip.css";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { AuthContext } from '@/proviers/AuthProvider';



const NavBar = () => {

  const [openNav, setOpenNav] = React.useState(false);
  const {user,loading, logOut} = useContext(AuthContext)

  const prevTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(prevTheme)


  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleToggle = () => {
    console.log('clicked')
    console.log(theme)
    setTheme(theme === "dark" ? 'light' : 'dark')
  };

  const handleLogout = () => {
    logOut()
    .then()
    .catch(error=>console.log(error))
  }

  const activeStyles =
    "lg:border-b-2 transition duration-300 ease-in-out px-2 border-c-primary font-bold hover:bg-c-primary hover:text-[#fff] text-[15px] my-2 lg:my-0 mx-0 hover:rounded py-2 ";
  const inactiveStyles =
    "px-1 xl:px-2 font-medium border-y border-transparent   mx-1  hover:font-black-800 rounded hover:bg-base-200  text-[15px] my-2 lg:my-0 mx-0 py-2";

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
      >
        Home
      </NavLink>
      <NavLink
        to="/membership"
        className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
      >
        Membership
      </NavLink>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='h-auto relative'>

            <FaRegBell className="w-5 h-5" />

            <p className='absolute rounded-full text-xs text-white bg-c-secondary -top-2 left-2 z-10 px-1'>5</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-[310px] md:max-w-[431px]">
          <DropdownMenuLabel>Announcements</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Please beware of the rules and regulations Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure deleniti hic nihil aspernatur reiciendis nesciunt sit, quia eos quaerat libero amet facere ducimus animi blanditiis quidem neque nam nisi ea.</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>




      {user && (
        <>

        </>
      )}
    </>
  );

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col lg:gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center ">
      {links}
    </ul>
  );

  return (
    <div className="max-h-[768px] w-full overflow-hidden border-0 outline-none py-0">
      <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none dark:bg-gray-900  text-c-black'>
        <div className="flex justify-between h-[40px] md:h-[50px] max-w-screen-xl w-[90%] md:w-5/6 mx-auto">
          <Typography className="mr-4 cursor-pointer font-bold text-2xl md:text-3xl flex items-center gap-2">
            <img className="w-6 h-6" src="/logo.png" alt="" />
            <Link to="/"><span className='text-c-primary'>Craze</span><span className='text-c-secondary'>Forum</span></Link>
          </Typography>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:block">{navList}</div>
            <div>
              <div className='w-6 h-6' onClick={handleToggle}>
                {theme === "dark" ? <BsMoonStarsFill className='w-full h-full'></BsMoonStarsFill> : <BsSun className='w-full h-full'></BsSun>}
              </div>

            </div>
            <div className="flex items-center gap-x-1">
              {user && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='rounded-full'>
                      <div className="w-full max-w-[40px] max-h-[40px] rounded-full">
                        <img
                          className="w-full h-full rounded-full"
                          alt="Profile Picture"
                          src={user?.photoURL}
                        />
                      </div>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Sadiqur Rahman
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <MdOutlineDashboard>
                        </MdOutlineDashboard> &nbsp; Dashboard</DropdownMenuItem>
                      <DropdownMenuItem>
                        <MdLogout></MdLogout> &nbsp; Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
              {user ? (
                <button
                  className="btn bg-c-primary text-white rounded-lg md::text-[15px] font-bold hidden lg:block px-3 py-2 ml-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : loading ? (
                <Spinner className="h-8 w-8" color="orange" />
              ) : (
                <>
                  {" "}
                  <Link to="/login" className="hidden lg:block">
                    <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold mr-2">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" className="hidden lg:block">
                    <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold ">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden "
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className='h-6 w-6 dark:text-white absolute -top-3 -left-2'
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -top-3 -left-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav} className='w-[90%] mx-auto'>
          <div className="mr-4">{navList}</div>
          <div className="flex items-center gap-x-1 ">
            {user ? (
              <button
                className="btn bg-c-primary text-white md:text-[15px] font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : loading ? (
              <Spinner className="h-8 w-8" color="orange" />
            ) : (
              <>
                {" "}
                <Link to="/login" className="">
                  <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold mr-2">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn bg-c-primary  rounded-xl hover:bg-c-hover text-white md:text-[15px] font-bold ">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;