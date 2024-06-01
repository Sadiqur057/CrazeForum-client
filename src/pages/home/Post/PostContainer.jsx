import Post from "./Post";
import { IoMdSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "@/hooks/useAxiosCommon";

const PostContainer = () => {

  const axiosCommon = useAxiosCommon()

  const {data: posts} = useQuery({
    queryKey:['post'],
    queryFn: async()=>{
      const res = await axiosCommon.get('/posts')
      return res.data

    }
  })

  const tags = ['comedy', 'coding', 'technologies', 'programming', 'music', 'arts']
  const announcements = ['Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, porro neque. Repellat debitis nam reprehenderit qui quisquam ab officia commodi .', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, porro neque. Repellat debitis nam reprehenderit qui quisquam ab officia commodi .'] 

  return (
    <div className="mt-10 lg:mt-20">
      <div className="mb-6 md:mb-10 flex justify-between items-center">
        
        <h1 className="text-4xl font-bold">Featured Posts</h1>
        <Select >
          <SelectTrigger className="w-[180px] border-2 focus:ring-0">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="hidden">Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="lg:grid grid-cols-12 gap-4 ">
        <div className="col-span-4">
          <div className=" bg-[#f3f3f5] dark:bg-gray-800 h-fit p-4 md:p-6 lg:p-10 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-4 order-2">Exclusive Contents</h2>
            <div className="flex lg:block gap-x-6 flex-wrap order-1">
              {
                tags.map((tag) => <p key={tag} className="flex gap-2 items-center my-1 lg:my-2 cursor-pointer"><IoMdSearch></IoMdSearch>{tag}</p>)
              }
            </div>
          </div>
          <div className=" bg-[#f3f3f5] dark:bg-gray-800 h-fit p-4 md:p-6 lg:p-10 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-4 order-2">Latest Announcement</h2>
            <div>
              {
                announcements[announcements.length-1] 
              }
            </div>

          </div>
        </div>
        <div className="col-span-8">
          {
            posts.map(post=><Post key={post._id} post={post}></Post>)
          }
        </div>

      </div>
    </div>
  );
};

export default PostContainer;