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

const UserProfile = () => {
  let badge = 'gold';
  const { user } = useContext(AuthContext)
  const [posts,isLoading] = useLoadUserPost()

  console.log(posts)
  if (isLoading) {
    return <p>Loading</p>
  }
  return (
    <div className="p-5 md:grid grid-cols-12 gap-5 space-y-4 md:space-y-0">
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center lg:items-start lg:flex-row h-fit">
        <img className="w-14 h-14  rounded-full" src={user?.photoURL} alt="" />
        <div>
          <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 capitalize">{user?.displayName}</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-200 flex gap-2 items-center"><MdOutlineEmail></MdOutlineEmail> {user?.email}</p>
          <p className="text-sm mt-2">Just a simple guy looking for a fresh conversation to start</p>
        </div>

      </div>
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center lg:items-start lg:flex-row">
        <img className="w-16 rounded-full" src={badge === 'gold' ? gold : bronze} alt="" />
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
            <p>{badge === "gold" ? 'Unlimited Post' : "Limited Post"}</p>
          </div>
          <div className="mt-2 text-gray-600 dark:text-gray-200 flex">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-c-primary w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <p>{badge === "gold" ? 'Unlimited Comments' : "Limited Comments"}</p>
          </div>

        </div>

      </div>
      <div className="col-span-12">
        <h2 className="text-3xl font-bold mb-4 mt-8">Recent Posts</h2>
        {
          posts.map(post => <div key={post._id} className='bg-[#f3f3f5] dark:bg-gray-800 p-5 rounded-xl mb-4'>
            <div className="flex items-center justify-between">
              <span className="text-sm font-light text-gray-600 dark:text-gray-400 flex gap-2 items-center"><IoMdTime className='text-base mt-[1px]'></IoMdTime> {post?.posted_time}</span>
              <p>#{post?.tag}</p>
            </div>

            <div className="mt-2">
              <a href="#" className="text-xl font-bold text-gray-700 dark:text-gray-100" tabIndex="0" role="link">{post?.post_title}</a>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{post?.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti enim accusamus facilis commodi sed id architecto odit aliquam. Ab, recusandae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti enim accusamus facilis commodi sed id architecto odit aliquam. Ab, recusandae.</p>
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
          </div>)
        }
      </div>
    </div>
  );
};

export default UserProfile;