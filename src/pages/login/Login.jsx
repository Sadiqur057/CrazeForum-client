import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/proviers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa6";
import { Input } from "@material-tailwind/react";
import GoogleLogin from "@/components/socialLogin/GoogleLogin";
// import authImg from "../../assets/images/auth.png"

const Login = () => {

  const { signIn, githubLogin, setReload,  } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  // handle show password button
  const [showPassword, setShowPassword] = useState(false);
  const handleViewPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle form submit
  const onSubmit = (data, e) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;
    signIn(email, password)
      .then(() => {
        setReload(true)
        
        toast.success("Login Success");
        navigate(from, { replace: true })
      })
      .catch((error) => {
        // const errorMsg = error.message.split("(")[1].split(")")[0];
        console.log(error)
        // if (errorMsg === "auth/invalid-credential") {
        //   toast.error("Your email or password is incorrect");
        // } else {
        //   toast.error(errorMsg);
        // }
      });
  };



  const handleGithubLogin = () => {
    githubLogin()
      .then(() => {
        toast.success("Login Success");
        setReload(true)
        toast.success("Login Success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };


  return (
    <section className="lg:pt-6 flex py-[60px] items-center bg-cool lg:px-10">
      <Helmet>
        <title>CF | Login</title>
      </Helmet>
      <div className="flex justify-center w-[90%]  md:w-fit  mx-auto bg-base-100 items-center mt-6  rounded-xl">
        <div className="grid lg:grid-cols-2  justify-center w-[90%]   md:w-fit mx-auto bg-base-100 items-center mt-6  rounded-xl ">
          <div className="hidden lg:block w-full">
            {/* <img src={authImg} className="w-full max-h-[410px]" alt="" />r */}
          </div>
          <div className="m-0 p-0 md:px-2 lg:px-10 space-y-3 rounded-sm mx-auto lg:w-full md:w-[400px] md:max-w-[400px] w-[93%] ">
            <div className="m-0 md:px-8 lg:px-0 space-y-3 rounded-sm mx-auto lg:w-full lg:max-w-[400px] py-7 md:py-10">
              <h1 className="text-3xl font-bold text-center pb-4">Login Here</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col">
                  <div className="relative w-full min-w-[200px] h-10 mb-2">
                    <Input
                      required
                      type="email"
                      autoComplete="current-email"
                      {...register("email", { required: "Email is required" })}
                      color="orange"
                      label="Email"
                    />
                  </div>
                  <p className="pb-2 text-left text-red-500">
                    {errors.password?.message}
                  </p>
                  <div className="mt-1 relative w-full min-w-[200px] h-10">
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      label="Password"
                      color="orange"
                    />
                    <p
                      onClick={handleViewPassword}
                      className="cursor-pointer absolute right-4 top-3 text-xl"
                    >
                      {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </p>
                  </div>
                </div>

                <input
                  type="submit"
                  className="btn bg-c-primary  w-full text-white hover:bg-c-hover"
                  value="Login"
                />
              </form>
              <div className="flex items-center space-x-1 py-3">
                <div className="flex-1 h-px sm:w-16 bg-gray-400 dark:bg-gray-300"></div>
                <p className="px-3 text-sm text-gray-600">
                  Login with social accounts
                </p>
                <div className="flex-1 h-px sm:w-16 bg-gray-400 dark:bg-gray-300"></div>
              </div>
              <div className="space-y-4 text-sm">
                <GoogleLogin></GoogleLogin>
                <button
                  aria-label="Login with GitHub"
                  role="button"
                  className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-c-primary text-c-primary"
                  onClick={handleGithubLogin}
                >
                  <FaGithub className="text-lg"></FaGithub>
                  <p>Login with GitHub</p>
                </button>
              </div>

              <p className="text-sm text-center ">
                Dont have an account? &nbsp;
                <Link
                  to="/register"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;