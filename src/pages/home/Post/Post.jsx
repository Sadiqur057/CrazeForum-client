import React from 'react';
import { FaRegComments } from "react-icons/fa";
import { MdOutlineThumbsUpDown } from "react-icons/md";
import { IoMdTime } from "react-icons/io";



const Post = () => {
  const post = {
    author_image: 'https://i.postimg.cc/kXW3jLCc/client-3.png',
    author_email: 'sadiqur05@gmail.com',
    author_name: 'Sadiqur Rahman',
    post_title: "Will be added soon",
    description: 'sdlfks sdlfjs sdlfjsd sldfjsldf lsdfjkslf',
    tag: 'comedy',
    up_vote_count: 10,
    down_vote_count: 10,
    posted_time: '12/12/12'

  }

  return (
    <div class="bg-[#f3f3f5] dark:bg-gray-800 p-4 md:p-6 lg:p-10 rounded-3xl mb-4 md:mb-6 flex gap-3 lg:gap-6 mt-10 col-span-8">
      <div class=" w-10 md:w-[72px] h-10 md:h-[72px] relative rounded-md ">
        <img class="w-full rounded-3xl" src={post.author_image} />
      </div>
      <div class="flex-1">
        <div class="flex flex-col md:flex-row md:gap-4 lg:gap-6 font-inter font-medium text-[#12132dcc] dark:text-white">
          <h4># <span>{post?.tag || "unknown"}</span></h4>
          <h4>Author : <span>{post?.author_name || "unknown"}</span></h4>
        </div>
        <div class="border-b-[1px] lg:border-b-[2px] border-dashed border-[#12132d28]">
          <h1 class="pt-3 font-bold text-lg md:text-xl text-neutral-800 dark:text-white">{
            post?.post_title || "Not Specified"
          }</h1>
          <p class="py-3 md:py-4 text-c-text dark:text-gray-400">{
            post?.description || "Not Specified"
          }</p>
        </div>
        <div class="flex justify-between mt-3 md:mt-5 items-end text-gray-800">

          <div className='flex gap-10'>
            <p class='flex gap-2 items-center'><FaRegComments className='text-lg'></FaRegComments><span>{post?.comment_count || 0}</span></p>

            <p class='flex gap-2 items-center'><MdOutlineThumbsUpDown className='text-lg'></MdOutlineThumbsUpDown><span>{post?.up_vote_count || 0}</span></p>
          </div>

          <p class='flex gap-2 items-center'><IoMdTime className='text-lg'></IoMdTime><span>{post?.posted_time || 0}</span></p>

        </div>
      </div>
    </div>
  );
};

export default Post;