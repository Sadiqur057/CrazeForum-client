import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

import { useParams } from 'react-router-dom';
import Container from '@/components/container/Container';
import { FaRegComments } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { useContext, useState } from 'react';
import { AuthContext } from '@/proviers/AuthProvider';
import useLoadComments from '@/hooks/useLoadComments';

const PostDetails = () => {

  const axiosCommon = useAxiosCommon()
  const { id: postId } = useParams()
  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)
  const { user } = useContext(AuthContext)
  const [comments, isCommentsLoading, refetchComments] = useLoadComments()

  const { data: postDetails = {}, isLoading, refetch } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await axiosCommon.get(`/post/${postId}`)
      return res.data
    }
  })

  const { mutate: updateUpVote } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosCommon.post(`/post/upvote/${postId}`, data)
      if (res.data) {
        refetch()
      }
    }
  })

  const { mutate: updateDownVote } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosCommon.post(`/post/downvote/${postId}`, data)
      if (res.data) {
        refetch()
      }
    }
  })

  const handleUpVote = () => {
    if (downVote) {
      setDownVote(false)
      updateDownVote({ update: -1 })
    }
    setUpVote(true);
    updateUpVote({ update: 1 })


  }
  const handleDownVote = () => {
    if (upVote) {
      setUpVote(false)
      updateUpVote({ update: -1 })
    }
    setDownVote(true)
    updateDownVote({ update: 1 })
  }

  const { mutate } = useMutation({
    mutationFn: async (commentsDetails) => {
      const res = await axiosCommon.post('/comment', commentsDetails)
      if (res.data.insertedId) {
        console.log("success")
        refetchComments()
      }
    }
  })

  const handleComments = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value;
    const post_id = postId
    const commenter_name = user?.displayName;
    const commenter_email = user?.email;
    const feedback = "";
    const isReported = false;
    const commentsDetails = {
      comment, commenter_name, commenter_email, post_id, feedback, isReported
    }
    mutate(commentsDetails)
    e.target.comment.value = ''


  }

  console.log(postDetails)
  if (isLoading || isCommentsLoading) {
    return <p>Loading</p>
  }

  const { author_image, author_email, author_name, post_title, description, tag, up_vote_count, down_vote_count, comment_count, posted_time } = postDetails || {}
  console.log(author_email)
  return (
    <Container>
      <div className="px-8 py-4">
        <div className='bg-[#f3f3f5] dark:bg-gray-800 p-5 rounded-xl'>
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400 flex gap-2 items-center"><IoMdTime className='text-base mt-[1px]'></IoMdTime> {posted_time}</span>
            <p>#{tag}</p>
          </div>

          <div className="mt-2">
            <a href="#" className="text-xl font-bold text-gray-700 dark:text-gray-100" tabIndex="0" role="link">{post_title}</a>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
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

        <div className='md:grid grid-cols-12 gap-4 mt-6 flex'>

          <div className='col-span-5 order-2 mb-5 lg:mb-0 flex gap-3'>
            <div className='w-12 h-12'>
              <img className='w-full rounded-full' src={user?.photoURL} alt="" />
            </div>
            <form onSubmit={handleComments} className='w-full'>
              <textarea className='border  rounded-md border-c-secondary w-full outline-none p-2 bg:white dark:bg-gray-800' name="comment" placeholder='write a comment'></textarea>
              <input type="submit" className='bg-c-secondary w-full py-2 rounded-md text-white font-semibold' value="Comment" />
            </form>
          </div>
          <div className='col-span-7 order-1 space-y-4'>
            <div className="bg-[#f3f3f5] dark:bg-gray-800 p-5 rounded-xl">
              <h2 className='text-2xl font-bold'>Comments ({comments.length})</h2>
              {
                comments.map(comment => <div key={comment._id}>
                  <hr className='my-4 bg-[#eeeeee]' />
                  <p className="font-semibold text-gray-600 cursor-pointer dark:text-gray-200 mb-1" >{comment.commenter_name}</p>
                  <p className="text-gray-600 cursor-pointer dark:text-gray-200 leading-[22px]" >{comment.comment} </p>
                </div>)
              }

            </div>


          </div>

        </div>
      </div>
    </Container>
  );
};

export default PostDetails;