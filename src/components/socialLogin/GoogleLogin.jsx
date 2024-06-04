import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa6';

const GoogleLogin = () => {
  const axiosCommon = useAxiosCommon()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { googleSignIn } = useAuth()
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result)
        toast.success("Login Success")
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
          badge: 'bronze',
          reportCount: 0,
          isAdmin: false,
          postCount: 0
        }
        console.log(userInfo)
        axiosCommon.post('/users', userInfo)
          .then(res => {
            console.log(res.data)
            navigate(from, { replace: true })
          })


      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <button
      aria-label="Login with Google"
      type="button"
      className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-c-primary text-c-primary"
      onClick={handleGoogleLogin}
    >
      <FaGoogle className="text-lg"></FaGoogle>
      <p>Login with Google</p>
    </button>
  );
};

export default GoogleLogin;