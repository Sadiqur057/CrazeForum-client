import { AuthContext } from "@/proviers/AuthProvider";
import { useContext } from "react";
import bronze from '../../../assets/images/bronze-medal.png'
import gold from '../../../assets/images/gold-medal.png'
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComments } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { MdOutlineEmail } from "react-icons/md";
import useLoadUserPost from "@/hooks/useLoadUserPost";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const { user, loading } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const [posts, isLoading] = useLoadUserPost()

  const { data: userData = {}, isLoading: isUserLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`userInfo/${user?.email}`)
      console.log(res.data)
      return res.data
    }
  })

  console.log(posts)
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="p-3 md:p-5 md:grid grid-cols-12 gap-5 space-y-4 md:space-y-0">
      <Helmet>
        <title>CF | My Profile</title>
      </Helmet>
      {
        isUserLoading ? <div className="col-span-6 shadow-custom bg-white rounded-lg dark:bg-gray-800 flex gap-2 space-x-2 py-6 w-full px-4 h-fit ">
          <Skeleton className="h-12 w-16 rounded-full" />
          <div className="space-y-1 grid grid-cols-12 w-full gap-1 items-center">
            <div className="col-span-12 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="col-span-12">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div> : <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center lg:items-start lg:flex-row h-fit">
          <img className="w-14 h-14  rounded-full" src={userData?.photo} alt="" />
          <div>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 capitalize">{userData?.name}</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-200 flex gap-2 items-center"><MdOutlineEmail></MdOutlineEmail> {userData?.email}</p>
            <p className="text-sm mt-2">{userData?.bio}</p>
          </div>

        </div>
      }

      {
        isUserLoading ? <div className="col-span-6 shadow-custom bg-white rounded-lg dark:bg-gray-800 flex gap-2 space-x-2 py-7 w-full px-4 h-fit">
          <Skeleton className="h-20 w-16 rounded-full" />
          <div className="space-y-2 grid grid-cols-12 w-full gap-1 items-center">
            <div className="col-span-12 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div> : <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center lg:items-start lg:flex-row">
          <img className="w-16 rounded-full" src={userData?.badge === 'gold' ? gold : bronze} alt="" />
          <div>
            <div className="mt-2 text-gray-600 dark:text-gray-200 flex">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-c-primary w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <p>Lifetime</p>
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-200 flex">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-c-primary w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <p>{userData?.badge === "gold" ? 'Unlimited Post' : "Limited Post"}</p>
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-200 flex">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-c-primary w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <p>{userData?.badge === "gold" ? 'Unlimited Comments' : "Limited Comments"}</p>
            </div>
          </div>
        </div>
      }

      <div className="col-span-12">
        <h2 className="text-3xl font-bold mb-4 mt-8">Recent Posts</h2>
        {isLoading && <div className="flex gap-2 space-x-4 col-span-8 py-10 w-full px-5 h-fit">
          <div className="space-y-1 grid grid-cols-12 w-full gap-1 items-center">
            <div className="col-span-6 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <div className="col-span-6 self-end justify-end h-full flex">
              <Skeleton className="h-3 w-1/2" />
            </div>
            <div className="col-span-12">
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-4 ">
              <Skeleton className="h-3 w-full col-span-2" />
              <Skeleton className="h-3 col-span-6 w-1/3" />
            </div>
          </div>
        </div>}
        {
          posts.slice(posts.length - 3, posts.length).map(post =><Link key={post._id} to={`/post/${post?._id}`}><div  className='col-span-12 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 gap-5 mb-5'>
            <div className="flex items-center justify-between">
              <span className="text-sm font-light text-gray-600 dark:text-gray-400 flex gap-2 items-center"><IoMdTime className='text-base mt-[1px]'></IoMdTime> {post?.posted_time}</span>
              <p>#{post?.tag}</p>
            </div>

            <div className="mt-2">
              <a href="#" className="text-xl font-bold text-gray-700 dark:text-gray-100" tabIndex="0" role="link">{post?.post_title}</a>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{post?.description}</p>
            </div>
            <div className='mt-5 items-center'>
              <div className='flex text-gray-800 dark:text-gray-400 gap-5 md:gap-10'>
                <p className='flex gap-2 items-center'><FaRegComments className='text-lg'></FaRegComments><span>{post?.comment_count || 0}</span></p>
                <p className='flex gap-2 items-center'>
                  <button disabled>
                    <BiUpvote
                      className='text-lg'>
                    </BiUpvote>
                  </button>
                  <span>{post?.up_vote_count || 0}</span></p>
                <p className='flex gap-2 items-center'>
                  <button disabled>
                    <BiDownvote
                      className='text-lg'></BiDownvote>
                  </button>
                  <span>{post?.down_vote_count || 0}</span></p>
              </div>
            </div>
          </div> </Link> )
        }
      </div>
    </div>
  );
};

export default UserProfile;