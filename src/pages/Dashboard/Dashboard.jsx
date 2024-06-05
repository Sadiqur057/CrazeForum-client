import { Collapse, IconButton } from '@material-tailwind/react';
import { useContext, useEffect, useState } from 'react';
import { RiPagesLine, RiShieldUserLine } from "react-icons/ri";
import { GrAnnounce } from "react-icons/gr";
import { MdOutlineLibraryAdd, MdOutlineReportProblem } from "react-icons/md";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { FaUser } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { AuthContext } from '@/proviers/AuthProvider';
import { ToastContainer } from 'react-toastify';
const Dashboard = () => {
  const [openNav, setOpenNav] = useState(true);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(true)
    );
  }, []);

  
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

  const {user} = useContext(AuthContext)

  const activeStyles =
    "flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200";
  const inactiveStyles =
    "flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700";

  const isAdmin = true;

  return (
    <>
    <ToastContainer/>
      <div className='w-72 bg-gray-200 py-2 px-2 dark:bg-gray-900 lg:hidden'>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 lg:hidden "
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
              className="absolute dark:text-white -top-3 -left-2"
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
      <div className='lg:flex'>
        <Collapse open={openNav} className='mx-auto max-w-72 fixed lg:static'>
          <aside className="flex flex-col w-72 min-h-screen px-4 py-8 overflow-y-auto bg-gray-200  dark:bg-gray-900">

          <div className='flex px-2 gap-2 items-center'>
            <img className='w-6 h-6' src="/logo.png" alt="" />
            <h2 className='text-2xl font-bold'><span className='text-c-primary'>Craze</span><span className='text-c-secondary'>Forum</span></h2>
          </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
              
              <nav className='space-y-2'>
                <NavLink to='/dashboard/userProfile' className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}>
                  <FaUser></FaUser>
                  <span className="mx-4 font-medium">My Profile</span>
                </NavLink>

                <NavLink to='/dashboard/userPost' className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}>
                  <RiPagesLine></RiPagesLine>
                  <span className="mx-4 font-medium">My Post</span>
                </NavLink>

                <NavLink to='/dashboard/addPost' className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}>
                  <MdOutlineLibraryAdd></MdOutlineLibraryAdd>
                  <span className="mx-4 font-medium">Add Post</span>
                </NavLink>


                {
                  isAdmin && <>
                    <NavLink to='/dashboard/adminProfile' className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}>
                      <RiShieldUserLine></RiShieldUserLine>
                      <span className="mx-4 font-medium">Admin Profile</span>
                    </NavLink>
                    <NavLink to='/dashboard/users' className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}>
                      <RiShieldUserLine></RiShieldUserLine>
                      <span className="mx-4 font-medium">Manage Users</span>
                    </NavLink>
                    <NavLink to='/dashboard/reportedActivities' className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}>
                      <MdOutlineReportProblem></MdOutlineReportProblem>
                      <span className="mx-4 font-medium">Reported Activities</span>
                    </NavLink>
                  

                    <NavLink to='/dashboard/addAnnouncement' className={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}>
                      <GrAnnounce></GrAnnounce>
                      <span className="mx-4 font-medium">Make Announcement</span>
                    </NavLink>
                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    <NavLink to='/'>
                      <p className="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" >
                        <FaHome></FaHome>
                        <span className="mx-4 font-medium">Home</span>
                      </p>
                    </NavLink>
                    <div onClick={handleToggle} className='cursor-pointer'>
                      <p className="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 mb-8" >
                        {theme==="light"? <BsSun></BsSun>:<BsMoonStarsFill></BsMoonStarsFill>}
                        <span className="mx-4 font-medium ">Change Theme</span>
                      </p>
                    </div>
                  </>
                }

              </nav>


              <a href="#" className="flex items-center px-4 -mx-2">
                <img className="object-cover mx-2 rounded-full h-9 w-9" src={user?.photoURL} alt="avatar" />
                <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">{user?.displayName}</span>
              </a>
            </div>
          </aside>

        </Collapse>
        <div className='w-full p-3'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;