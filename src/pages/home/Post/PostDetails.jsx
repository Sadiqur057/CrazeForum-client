import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { Link, useParams } from 'react-router-dom';
import Container from '@/components/container/Container';
import { FaRegComments } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { useContext, useState } from 'react';
import { AuthContext } from '@/proviers/AuthProvider';
import useLoadComments from '@/hooks/useLoadComments';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet-async';

const PostDetails = () => {

  const axiosCommon = useAxiosCommon()
  const { id: postId } = useParams()
  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)
  const { user } = useContext(AuthContext)
  const [comments, isCommentsLoading, refetchComments] = useLoadComments(postId)

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

  const { mutate, isPending } = useMutation({
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
    return <Container>
      <div className="gap-2 space-x-4 col-span-8 py-10 w-full  h-fit">
        <div className="space-y-1 grid grid-cols-12 w-full gap-1 items-center">
          <div className="col-span-6 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="col-span-6 self-end justify-end h-full flex">
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="col-span-12">
            <Skeleton className="h-28 w-full" />
          </div>
          <div className='col-span-full flex space-x-4 items-center'>
            <Skeleton className="h-10 w-10 rounded-full " />
            <div className='space-y-2'>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-4 ">
            <Skeleton className="h-3 w-full col-span-1" />
            <Skeleton className="h-3 col-span-1 w-full" />
            <Skeleton className="h-3 col-span-6 w-1/6" />
            <Skeleton className="h-3 col-span-4 " />
          </div>
        </div>
      </div>
    </Container>
  }

  const { _id, author_image, author_email, author_name, post_title, description, tag, up_vote_count, down_vote_count, posted_time } = postDetails || {}
  console.log(author_email)

  const shareUrl = `https://craze-forum.web.app/post/${_id}`
  console.log(shareUrl)

  return (
    <Container>
      <Helmet>
        <title>CF | {post_title}</title>
      </Helmet>
      <div>

        <div className='bg-[#f3f3f5] dark:bg-gray-800 p-5 rounded-xl'>
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400 flex gap-2 items-center"><IoMdTime className='text-base mt-[1px]'></IoMdTime> {posted_time}</span>
            <p>#{tag}</p>
          </div>

          <div className="mt-2">
            <a href="#" className="text-xl font-bold text-gray-800 dark:text-gray-100" tabIndex="0" role="link">{post_title}</a>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{description} </p>
          </div>
          <div className='mt-5 grid grid-cols-12 gap-y-1 md:gap-y-2 items-center '>
            <div className="col-span-full mb-4 flex items-center gap-2 md:gap-4">
              <img className="object-cover object-center w-8 h-8 md:w-10 md:h-10 rounded-full sm:block" src={author_image} alt="avatar" />
              <div>
                <p className="font-semibold text-gray-800 cursor-pointer dark:text-gray-200 leading-4" >{author_name}</p>
                <p className="text-gray-600 text-sm font-medium cursor-pointer dark:text-gray-200" >author</p>
              </div>
            </div>
            <div className='col-span-6 flex text-gray-800 dark:text-gray-400 gap-3 md:gap-10 text-sm md:text-base'>
              <p className='flex gap-1 md:gap-2 items-center'><FaRegComments className='text-lg'></FaRegComments><span>{comments.length || 0}</span></p>
              <p className='flex gap-1 md:gap-2 items-center'>
                <button disabled={upVote || !user}>
                  <BiUpvote
                    onClick={handleUpVote}
                    className={`text-lg ${upVote && 'text-c-primary'}`}>
                  </BiUpvote>
                </button>
                <span>{up_vote_count || 0}</span></p>
              <p className='flex gap-1 md:gap-2 items-center'>
                <button disabled={downVote || !user}>
                  <BiDownvote
                    onClick={handleDownVote}
                    className={`text-lg ${downVote && 'text-red-600'}`}></BiDownvote>
                </button>
                <span>{down_vote_count || 0}</span></p>
            </div>

            <div className="col-span-6 flex justify-end items-center gap-2 md:gap-4 text-gray-700 text-sm md:text-base">
              <span className='hidden md:block'>Share to</span> <FacebookShareButton
                url={shareUrl}
                quote={post_title}
                hashtag={tag}
              >
                <FacebookIcon size={25} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton
                url={shareUrl}
                quote={post_title}
                hashtag={tag}
              >
                <WhatsappIcon size={25} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>

        <div className='md:grid grid-cols-12 gap-4 mt-6'>

          {user ? <div className='col-span-5 order-2 mb-5 lg:mb-0 flex gap-3'>
            <div className='w-12 h-12'>
              <img className='w-full rounded-full' src={user?.photoURL} alt="" />
            </div>
            <form onSubmit={handleComments} className='w-full'>
              <textarea className='border  rounded-md border-c-secondary w-full outline-none p-2 bg:white dark:bg-gray-800' name="comment" placeholder='write a comment'></textarea>
              <input type="submit" className='bg-c-secondary w-full py-2 rounded-md text-white font-semibold' value="Comment" />
            </form>
          </div> : <div className='col-span-5 order-2 mb-5 lg:mb-0 flex gap-3 bg-[#f3f3f5] dark:bg-gray-800 text-lg  h-fit px-5 py-6 rounded-xl flex-col items-center font-semibold'>
            <p className='font-bold'>Please Login to get all the services</p>
            <Link to='/login'><button className='bg-c-secondary py-2 px-3 rounded-md'>Login</button></Link>
          </div>}

          <div className='col-span-7 order-1 space-y-4 mb-5'>
            <div className="bg-[#f3f3f5] dark:bg-gray-800 p-5 rounded-xl">
              <h2 className='text-xl md:text-2xl font-bold'>Comments ({comments.length})</h2>
              {isPending && <div className='space-y-2 mt-4'>
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>}
              {

                comments.map(comment => <div key={comment._id}>
                  <hr className='my-4 bg-[#eeeeee]' />
                  <p className="font-semibold text-gray-800 cursor-pointer dark:text-gray-200 mb-1" >{comment.commenter_name}</p>
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