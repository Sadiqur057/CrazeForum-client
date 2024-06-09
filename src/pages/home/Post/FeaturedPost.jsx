
import { IoMdSearch } from "react-icons/io";
import useLoadAnnouncements from "@/hooks/useLoadAnnouncements";
import PropTypes from 'prop-types'
import useLoadTags from "@/hooks/useLoadTags";
import PostContainer from "./PostContainer";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedPost = ({ postsByTagLoading, displayPosts, refetchPostsByTag, setKeyword, setSorted, currentPage, setCurrentPage, count }) => {

  const [announcements, isAnnouncementLoading] = useLoadAnnouncements()


  const [tags, , isTagsLoading] = useLoadTags()


  const handleSort = () => {
    setSorted(true)
    refetchPostsByTag()
    setCurrentPage(0)
  }

  const handleSearch = (keyword) => {
    setKeyword(keyword)
    refetchPostsByTag()
    setCurrentPage(0)
  }




  return (
    <div className="mt-10 lg:mt-20">
      <div className="mb-6 md:mb-10 flex justify-between items-center">

        <h1 className="text-3xl md:text-4xl font-bold">Featured Posts</h1>
        <button onClick={handleSort} className="bg-c-primary px-4 py-3 text-white rounded-md">Sort by Popularity</button>

      </div>
      <div className="lg:grid grid-cols-12 gap-4 ">
        <div className="col-span-4">
          <div className=" bg-[#f3f3f5] dark:bg-gray-800 h-fit p-4 md:p-6 lg:p-10 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-4 order-2">Exclusive Contents</h2>
            <div className="flex lg:block gap-x-6 flex-wrap order-1">
              {
                isTagsLoading ? <div className="col-span-12 space-y-3">
                  <Skeleton className="h-3 w-3/5" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-4/6" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-3/5" />
                </div> :
                  tags.map((tag) => <p onClick={() => handleSearch(tag?.tagName)} key={tag?.tagName} className="flex gap-2 items-center my-1 lg:my-2 cursor-pointer"><IoMdSearch></IoMdSearch>{tag?.tagName}</p>)
              }
            </div>
          </div>

          <div className=" bg-[#f3f3f5] hidden lg:block dark:bg-gray-800 h-fit p-4 md:p-6 lg:p-10 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-4 order-2">Latest Announcement</h2>
            <div>
              {
                isAnnouncementLoading ? <div className="col-span-12 space-y-3">
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-10 w-full" />

                </div> :

                  announcements.length>0? announcements.map(announcement => <div key={announcement?._id}>
                    <div className="my-3 bg-gray-300 dark:bg-gray-600 h-[1px]" />
                    <h4 className="text-lg font-semibold mb-2">{
                      announcement?.title
                    }</h4>
                    <p className="text-sm">{
                      announcement?.description
                    }</p></div>):<p>No Announcement yet!</p>
              }
            </div>
          </div>

        </div>

        <PostContainer setCurrentPage={setCurrentPage} currentPage={currentPage} displayPosts={displayPosts} postsByTagLoading={postsByTagLoading} count={count}></PostContainer>

      </div>
    </div>
  );
};
FeaturedPost.propTypes = {
  displayPosts: PropTypes.array,
  postsByTagLoading: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  count: PropTypes.number,
  currentPage: PropTypes.string,
  setSorted: PropTypes.func,
  setKeyword: PropTypes.func,
  refetchPostsByTag: PropTypes.func,
}

export default FeaturedPost;