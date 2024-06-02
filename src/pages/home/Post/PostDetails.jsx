import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

import { useParams } from 'react-router-dom';
import Container from '@/components/container/Container';
import { FaRegComments } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { useState } from 'react';

const PostDetails = () => {

  const axiosCommon = useAxiosCommon()
  const { id: postId } = useParams()
  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)

  const { data: postDetails = {}, isLoading, refetch } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await axiosCommon.get(`/post/${postId}`)
      return res.data
    }
  })

  const { mutate: updateUpVote } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosCommon.post(`/post/upvote/${postId}`,data)
      if(res.data){
        refetch()
      }
    }
  })

  const { mutate: updateDownVote } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosCommon.post(`/post/downvote/${postId}`,data)
      if(res.data){
        refetch()
      }
    }
  })

  const handleUpVote = () => {
    if (downVote) {
      setDownVote(false)
      updateDownVote({update:-1})
    }
    setUpVote(true);
    updateUpVote({update:1})
    

  }
  const handleDownVote = () => {
    if (upVote) {
      setUpVote(false)
      updateUpVote({update:-1})
    }
    setDownVote(true)
    updateDownVote({update:1})
    

  }

  console.log(postDetails)
  if (isLoading) {
    return <p>Loading</p>
  }

  const { _id, author_image, author_email, author_name, post_title, description, tag, up_vote_count, down_vote_count, comment_count, posted_time } = postDetails || {}
  return (
    <Container>
      <div className="px-8 py-4">
        <div className='bg-[#f3f3f5] dark:bg-gray-800 p-5 rounded-xl'>
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400 flex gap-2 items-center"><IoMdTime className='text-base mt-[1px]'></IoMdTime> {posted_time}</span>
            <p>#Comedy</p>
          </div>

          <div className="mt-2">
            <a href="#" className="text-xl font-bold text-gray-700 dark:text-gray-100" tabIndex="0" role="link">{post_title}</a>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti enim accusamus facilis commodi sed id architecto odit aliquam. Ab, recusandae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti enim accusamus facilis commodi sed id architecto odit aliquam. Ab, recusandae.</p>
          </div>
          <div className='mt-5 grid grid-cols-12 items-center'>
            <div className='col-span-6'>
              <div className='flex text-gray-800 dark:text-gray-400 gap-5 md:gap-10'>
                <p className='flex gap-2 items-center'><FaRegComments className='text-lg'></FaRegComments><span>{comment_count || 0}</span></p>
                <p className='flex gap-2 items-center'>
                  <button disabled={upVote}>
                    <BiUpvote
                      onClick={handleUpVote}
                      className={`text-lg ${upVote && 'text-c-primary'}`}>
                    </BiUpvote>
                  </button>
                  <span>{up_vote_count || 0}</span></p>
                <p className='flex gap-2 items-center'>
                  <button disabled={downVote}>
                    <BiDownvote
                      onClick={handleDownVote}
                      className={`text-lg ${downVote && 'text-red-600'}`}></BiDownvote>
                  </button>
                  <span>{down_vote_count || 0}</span></p>
              </div>
            </div>
            <div className="col-span-6 justify-end flex items-center gap-4 mb-5">
              <img className="object-cover object-center w-10 h-10  rounded-full sm:block" src={author_image} alt="avatar" />
              <div>
                <p className="font-semibold text-gray-600 cursor-pointer dark:text-gray-200 leading-4" >{author_name}</p>
                <p className="text-gray-400 text-sm font-medium cursor-pointer dark:text-gray-200" >author</p>
              </div>
            </div>
          </div>
        </div>

        <div className='md:grid grid-cols-12 gap-10 mt-6'>
          <form className='col-span-6 order-2 mb-5 lg:mb-0'>
            <textarea className='border  rounded-md border-c-secondary w-full outline-none p-2 bg:white dark:bg-gray-800' placeholder='write a comment'></textarea>
            <input type="submit" className='bg-c-secondary w-full py-2 rounded-md text-white font-semibold' value="Comment" />
          </form>
          <div className='col-span-6 order-1 space-y-4'>
            <div className="bg-[#f3f3f5] dark:bg-gray-800 p-5 rounded-xl">
              <h2 className='text-2xl font-bold'>Comments</h2>
              <div>
              <hr className='my-4 bg-[#eeeeee]'/>
                <p className="font-semibold text-gray-600 cursor-pointer dark:text-gray-200 mb-1" >{author_name}</p>
                <p className="text-gray-600 cursor-pointer dark:text-gray-200 leading-[22px]" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ducimus obcaecati </p>
              </div>

              <div>
              <hr className='my-4 bg-[#eeeeee]'/>
                <p className="font-semibold text-gray-600 cursor-pointer dark:text-gray-200 mb-1" >{author_name}</p>
                <p className="text-gray-600 cursor-pointer dark:text-gray-200 leading-[22px]" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ducimus obcaecati </p>
              </div>
            </div>


          </div>

        </div>
      </div>
    </Container>
  );
};

export default PostDetails;