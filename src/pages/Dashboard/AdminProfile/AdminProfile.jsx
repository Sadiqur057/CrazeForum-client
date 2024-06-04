import { AuthContext } from "@/proviers/AuthProvider";
import { useContext } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComments, FaUsers } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { MdOutlineEmail } from "react-icons/md";
import useLoadUserPost from "@/hooks/useLoadUserPost";
import { FaComments } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";


const AdminProfile = () => {
  const { user } = useContext(AuthContext)
  const [posts,isLoading] = useLoadUserPost()

  console.log(posts)
  if (isLoading) {
    return <p>Loading</p>
  }
  return (
    <div className="p-5 md:grid grid-cols-12 gap-3 space-y-4 md:space-y-0">
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center lg:items-start lg:flex-row h-fit ">
        <img className="w-14 h-14  rounded-full" src={user?.photoURL} alt="" />
        <div className="w-full flex flex-col items-center lg:items-start">
          <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 capitalize">{user?.displayName}</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-200 flex gap-2 items-center"><MdOutlineEmail></MdOutlineEmail> {user?.email}</p>
        </div>

      </div>
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center h-fit lg:flex-row">
        <div className="bg-gray-100 dark:bg-gray-500 p-3 rounded-full">
          <FaUsers className="text-3xl text-c-primary"></FaUsers>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start">
          <p>Total Users</p>
          <h2 className="text-2xl font-bold">340</h2>
        </div>

      </div>
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center h-fit lg:flex-row">
        <div className="bg-gray-100 dark:bg-gray-500 p-3 rounded-full">
          <LiaCommentSolid className="text-3xl text-c-primary"></LiaCommentSolid>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start">
          <p>Total Posts</p>
          <h2 className="text-2xl font-bold">123</h2>
        </div>

      </div>
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center h-fit lg:flex-row">
        <div className="bg-gray-100 dark:bg-gray-500 p-3 rounded-full">
          <FaComments className="text-3xl text-c-primary"></FaComments>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start">
          <p>Total Comments</p>
          <h2 className="text-2xl font-bold">340</h2>
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

export default AdminProfile;