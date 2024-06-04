import { FaRegComments } from "react-icons/fa";
import { MdOutlineThumbsUpDown } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";



const Post = ({ post }) => {

  const { _id, author_image, author_name, post_title, description, tag, up_vote_count, down_vote_count, comment_count, posted_time } = post || {}
  const total_votes = up_vote_count - down_vote_count;

  return (
    <Link to={`/post/${_id}`}>
      <div className="bg-[#f3f3f5] dark:bg-gray-800 p-4 md:p-6 lg:p-10 rounded-xl mb-4 md:mb-4 flex flex-col md:flex-row gap-3 lg:gap-6 h-fit">
        <div className="flex gap-4">
          <img className="w-10 h-10 md:w-[72px] md:h-[72px] rounded-3xl" src={author_image} />
          <h4 className='flex font-medium flex-col md:hidden text-gray-800 dark:text-gray-300'> <span>{author_name || "unknown"}</span> <span className="text-sm text-gray-600 dark:text-gray-500">Author</span></h4>
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between md:gap-4 lg:gap-6 font-inter font-medium text-[#12132dcc] dark:text-white">
            <h1 className="font-bold text-lg md:text-xl text-neutral-800 dark:text-white">{
              post_title || "Not Specified"
            }</h1>
            <h4># <span>{tag || "unknown"}</span></h4>
          </div>
          <div className="border-b-[1px] lg:border-b-[2px] border-dashed border-[#12132d28]">
            <h4 className=' items-center text-c-text dark:text-gray-400 gap-2 hidden md:flex'> <span>{author_name || "unknown"}</span></h4>
            <p className="py-3 md:py-4 text-c-text dark:text-gray-300">{
              description || "Not Specified"
            }</p>
          </div>
          <div className="flex justify-between mt-3 md:mt-5 items-end text-gray-800 dark:text-gray-400 gap-2 md:gap-6">

            <div className='flex gap-4 md:gap-10'>
              <p className='flex gap-2 items-center'><FaRegComments className='text-lg'></FaRegComments><span>{comment_count || 0}</span></p>

              <p className='flex gap-2 items-center'><MdOutlineThumbsUpDown className='text-lg'></MdOutlineThumbsUpDown><span>{total_votes || 0}</span></p>
            </div>

            <p className='flex gap-2 items-center'><IoMdTime className='text-lg'></IoMdTime><span>{posted_time || 0}</span></p>

          </div>
        </div>
      </div>
    </Link>
  );
};

Post.propTypes = {
  post: PropTypes.object
}

export default Post;