import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home/Home"
import PostDetails from "@/pages/home/Post/PostDetails";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Membership from "@/pages/Membership/Membership";
import Dashboard from "@/layout/Dashboard";
import UserProfile from "@/pages/Dashboard/UserProfile/UserProfile";
import UserPost from "@/pages/Dashboard/UserProfile/UserPost";
import AddPost from "@/pages/Dashboard/UserProfile/AddPost";
import AdminProfile from "@/pages/Dashboard/AdminProfile/AdminProfile";
import Users from "@/pages/Dashboard/AdminProfile/Users";
import AddAnnouncement from "@/pages/Dashboard/AdminProfile/AddAnnouncement";
import Comments from "@/pages/Dashboard/UserProfile/Comments";
import ReportedActivities from "@/pages/Dashboard/AdminProfile/ReportedActivities";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import EditProfile from "@/pages/Dashboard/UserProfile/EditProfile";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: <PrivateRoutes><Membership></Membership></PrivateRoutes>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'userProfile',
        element: <PrivateRoutes><UserProfile></UserProfile></PrivateRoutes>
      },
      {
        path: 'userPost',
        element: <PrivateRoutes><UserPost></UserPost></PrivateRoutes>
      },
      {
        path: 'addPost',
        element: <PrivateRoutes><AddPost></AddPost></PrivateRoutes>
      },
      {
        path: 'editProfile',
        element: <PrivateRoutes><EditProfile></EditProfile></PrivateRoutes>
      },
      {
        path: 'comments/:postId',
        element: <PrivateRoutes><Comments></Comments></PrivateRoutes>
      },
      {
        path: 'adminProfile',
        element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
      },
      {
        path: 'users',
        element: <AdminRoutes><Users></Users></AdminRoutes>
      },
      {
        path: 'addAnnouncement',
        element: <AdminRoutes><AddAnnouncement></AddAnnouncement></AdminRoutes>
      },
      {
        path: 'reportedActivities',
        element: <AdminRoutes><ReportedActivities></ReportedActivities></AdminRoutes>
      },
    ]
  }
])
