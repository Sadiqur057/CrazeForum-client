
import useLoadUserPost from "@/hooks/useLoadUserPost";
import { Button } from "@material-tailwind/react";

const UserPost = () => {


  const [posts,isLoading] = useLoadUserPost()

  if(isLoading){
    return "loading"
  }
  return (
    <div className='p-5 overflow-auto'>
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
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{idx+1}</td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <h2 className="font-medium text-gray-800 dark:text-white ">{post?.post_title}</h2>
              </td>
              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                {post?.up_vote_count-post?.down_vote_count}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2">
                <Button className="rounded-xl bg-c-primary"> Comments</Button>
                <Button className="rounded-xl bg-red-500">Delete</Button>
              </td>


            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default UserPost;