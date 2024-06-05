import useAxiosCommon from "@/hooks/useAxiosCommon";
import { Button } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";


const ReportedActivities = () => {
  const axiosCommon = useAxiosCommon()
  const {data: comments=[], refetch} = useQuery({
    queryKey:['reported-comments'],
    queryFn: async()=>{
      const res = await axiosCommon.get('/reportedComments')
      return res.data
    }
  })

  const {mutate} = useMutation({
    mutationFn: async(id)=>{
      const res = await axiosCommon.delete(`/comment/${id}`)
      if(res.data.deletedCount>0){
        refetch()
        toast.success('This comment has been deleted')
      }
    }
  })

  const handleDeleteComment = (id)=>{
    console.log('delete ',id)
    mutate(id)
    
  }

  return (
    <div className='p-5 overflow-auto'>
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th scope="col" className=" py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></th>
          <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <button className="flex items-center gap-x-3 focus:outline-none">
              <span>User email</span>
            </button>
          </th>

          <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            comment
          </th>
          <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            Feedback
          </th>


          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>

        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {
          comments.map((comment, idx) => <tr key={comment._id}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{idx + 1}</td>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <h2 className="font-medium text-gray-800 dark:text-white ">{comment?.commenter_email}</h2>
            </td>
            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
              {comment?.comment}
            </td>
            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
              {comment?.feedback}
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2">
              <Button onClick={()=>handleDeleteComment(comment?._id)} className="rounded-xl bg-red-500">Delete Comment</Button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  </div>
  );
};

export default ReportedActivities;