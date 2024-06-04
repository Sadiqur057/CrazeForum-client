import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home/Home"
import PostDetails from "@/pages/home/Post/PostDetails";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Membership from "@/pages/Membership/Membership";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UserProfile from "@/pages/Dashboard/UserProfile/UserProfile";
import UserPost from "@/pages/Dashboard/UserProfile/UserPost";
import AddPost from "@/pages/Dashboard/UserProfile/AddPost";
import AdminProfile from "@/pages/Dashboard/AdminProfile/AdminProfile";

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/post/:id',
        element: <PostDetails></PostDetails>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/membership',
        element: <Membership></Membership>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children:[
      {
        path:'userProfile',
        element:<UserProfile></UserProfile>
      },
      {
        path:'userPost',
        element:<UserPost></UserPost>
      },
      {
        path:'addPost',
        element:<AddPost></AddPost>
      },
      {
        path:'adminProfile',
        element:<AdminProfile></AdminProfile>
      },
    ]
  }
])
