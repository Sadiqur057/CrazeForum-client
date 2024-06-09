import { Skeleton } from "@/components/ui/skeleton";
import Post from "./Post";
import PropTypes from 'prop-types'

const PostContainer = ({ setCurrentPage, currentPage, count, displayPosts, postsByTagLoading }) => {
  
  // pagination related
  const itemsPerPage = 5;
  const numOfPages = Math.ceil(count / itemsPerPage)
  const pages = [...Array(numOfPages).keys()];
  console.log(count)

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

  if (postsByTagLoading) {
    return <div className="flex gap-2 space-x-4 col-span-8 py-10 w-full px-5 h-fit bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Skeleton className="h-14 w-16 rounded-xl" />
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
          <Skeleton className="h-3 col-span-4 " />
        </div>
      </div>
    </div>
  }
  return (
    <div className="col-span-8 overflow-auto">

      {
        displayPosts.map(post => <Post key={post._id} post={post} postsByTagLoading={postsByTagLoading}></Post>)
      }
      {
        numOfPages ? <div className="pagination flex justify-center gap-2 md:gap-4 mb-5 text-sm md:text-base">
          <button
            className="p-2 md:px-4 rounded bg-gray-200 dark:bg-gray-700"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          {
            pages.map(page => <button
              className={currentPage === page ? "p-2 md:px-4 rounded bg-c-primary text-white" : "p-2 md:px-4 rounded bg-gray-200 dark:bg-gray-700"}
              onClick={() => setCurrentPage(page)}
              key={page}>
              {page + 1}
            </button>)
          }
          <button
            className="p-2 ms:px-4 rounded bg-gray-200 dark:bg-gray-700"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div> : <div className="text-center py-20"> No data found</div>
      }
    </div>
  );
};

PostContainer.propTypes = {
  displayPosts: PropTypes.array,
  postsByTagLoading: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  count: PropTypes.number,
  currentPage: PropTypes.string,
};

export default PostContainer;