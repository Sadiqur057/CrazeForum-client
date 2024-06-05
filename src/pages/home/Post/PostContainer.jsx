import Post from "./Post";
import { IoMdSearch } from "react-icons/io";
import useLoadAnnouncements from "@/hooks/useLoadAnnouncements";
import PropTypes from 'prop-types'
import { Button } from "@material-tailwind/react";
import useLoadTags from "@/hooks/useLoadTags";

const PostContainer = ({ postsByTagLoading, displayPosts, setDisplayPosts,refetchPostsByTag, setKeyword }) => {

  const [announcements] = useLoadAnnouncements()

  const [tags ] = useLoadTags()


  const handleSort = () => {
    const sortedData = [...displayPosts].sort((a, b) => {
      const voteDiffA = a.up_vote_count - a.down_vote_count
      const voteDiffB = b.up_vote_count - b.down_vote_count
      return voteDiffB - voteDiffA
    })
    setDisplayPosts(sortedData)
  }

  const handleSearch = (keyword)=>{
    setKeyword(keyword)
    refetchPostsByTag()
  }



  return (
    <div className="mt-10 lg:mt-20">
      <div className="mb-6 md:mb-10 flex justify-between items-center">

        <h1 className="text-4xl font-bold">Featured Posts</h1>
        <Button onClick={handleSort} className="bg-c-primary px-4 py-3">Sort by Popularity</Button>

      </div>
      <div className="lg:grid grid-cols-12 gap-4 ">
        <div className="col-span-4">
          <div className=" bg-[#f3f3f5] dark:bg-gray-800 h-fit p-4 md:p-6 lg:p-10 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-4 order-2">Exclusive Contents</h2>
            <div className="flex lg:block gap-x-6 flex-wrap order-1">
              {
                tags.map((tag) => <p onClick={()=>handleSearch(tag?.tagName)} key={tag?.tagName} className="flex gap-2 items-center my-1 lg:my-2 cursor-pointer"><IoMdSearch></IoMdSearch>{tag?.tagName}</p>)
              }
            </div>
          </div>
          <div className=" bg-[#f3f3f5] dark:bg-gray-800 h-fit p-4 md:p-6 lg:p-10 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-4 order-2">Latest Announcement</h2>
            <div>
              {
                announcements.map(announcement => <div key={announcement?._id}>
                  <div className="my-3 bg-gray-300 dark:bg-gray-600 h-[1px]" />
                  <h4 className="text-lg font-semibold mb-2">{
                    announcement?.title
                  }</h4>
                  <p className="text-sm">{
                    announcement?.description
                  }</p></div>)
              }
            </div>
          </div>
        </div>
        <div className="col-span-8">
          {
            displayPosts.map(post => <Post key={post._id} post={post} postsByTagLoading={postsByTagLoading}></Post>)
          }
        </div>
      </div>
    </div>
  );
};
PostContainer.propTypes = {
  displayPosts: PropTypes.array,
  postsByTagLoading: PropTypes.bool,
  setDisplayPosts: PropTypes.func,
  setKeyword: PropTypes.func,
  refetchPostsByTag: PropTypes.func,
}


export default PostContainer;