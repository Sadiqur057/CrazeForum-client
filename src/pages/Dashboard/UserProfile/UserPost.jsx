
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import useLoadUserPost from "@/hooks/useLoadUserPost";
import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserPost = () => {


  const [currentPage, setCurrentPage] = useState(0)
  const [posts, isLoading, refetchPosts,userPostCounts] = useLoadUserPost(currentPage)
  const axiosCommon = useAxiosCommon()

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosCommon.delete(`/post/${id}`)
      console.log(res.data)
      if (res.data.deletedCount > 0) {
        toast.success('This post has been deleted')
        refetchPosts()
      }
    }
  })

  const handleDeletePost = (id) => {
    console.log('delete', id)
    mutate(id)
  }

  // pagination related
  const itemsPerPage = 10;
  const numOfPages = Math.ceil(userPostCounts / itemsPerPage)
  const pages = [...Array(numOfPages).keys()];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className='p-3 md:p-5 overflow-auto'>
      <Helmet>
        <title>CF | My posts</title>
      </Helmet>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className=" py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></th>
            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <button className="flex items-center gap-x-3 focus:outline-none">
                <span>Post Title</span>
              </button>
            </th>

            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              Number of Votes
            </th>


            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {
            posts.map((post, idx) => <tr key={post._id}>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{idx + 1}</td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <h2 className="font-medium text-gray-800 dark:text-white ">{post?.post_title}</h2>
              </td>
              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                {post?.up_vote_count - post?.down_vote_count}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2">
                <Link to={`/dashboard/comments/${post?._id}`}>
                  <Button className="rounded-xl bg-c-primary"> Comments</Button>
                </Link>
                <Button onClick={() => handleDeletePost(post?._id)} className="rounded-xl bg-red-500">Delete</Button>
              </td>


            </tr>)
          }
        </tbody>

      </table>
      {
        numOfPages ? <div className="pagination flex justify-center gap-4 my-5">
          <button
            className="p-2 px-4 rounded bg-gray-200 dark:bg-gray-700"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          {
            pages.map(page => <button
              className={currentPage === page ? "p-2 px-4 rounded bg-c-primary text-white" : "p-2 px-4 rounded bg-gray-200 dark:bg-gray-700"}
              onClick={() => setCurrentPage(page)}
              key={page}>
              {page + 1}
            </button>)
          }
          <button
            className="p-2 px-4 rounded bg-gray-200 dark:bg-gray-700"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div> : <div className="text-center py-20"> No data found</div>
      }
    </div>
  );
};

export default UserPost;