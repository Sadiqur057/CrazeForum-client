import useAxiosCommon from "@/hooks/useAxiosCommon";
import useLoadComments from "@/hooks/useLoadComments";
import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const Comments = () => {
  const [comments, isLoading, refetchComments] = useLoadComments()
  const [feedback, setFeedback] = useState(null)
  const [reportedCommentId, setReportCommentId] = useState(null)
  const axiosCommon = useAxiosCommon()
  const categoryOptions = [
    { label: "Select Feedback", value: 'select' },
    { label: "Break rules", value: "Break rules" },
    { label: "Abusive behavior", value: "Abusive behavior" },
    { label: "Harmful", value: "Harmful"}
  ];

  const handleCategoryOptions = (e,commentId) => {
    const category = e.target.value;
    console.log(feedback)
    setFeedback(category);
    setReportCommentId(commentId)
  };

  const {mutate} = useMutation({
    mutationFn: async({id,feedback})=>{
      const res = await axiosCommon.put(`/comment/?id=${id}&feedback=${feedback}`)

      console.log(res.data)

      if(res.data.modifiedCount>0){
        console.log('success')
        toast.success("This comment has been reported")
        refetchComments()
      }

    }
  })

  const handleReport = (id)=>{
    const reportDetails  = {
      id, feedback
    }
    console.log(reportDetails)
    mutate(reportDetails)
  }

  if (isLoading) {
    return 'Loading'
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
                {comment?.feedback ? "Submitted" :
                  <div>
                    <select
                      required
                      id="category"
                      onChange={()=>handleCategoryOptions(event, comment?._id)}
                      className="w-full mt-1 p-[10px] rounded-md dark:bg-gray-800 bg-gray-100 outline-none"
                      selected={categoryOptions[0]}
                    >
                      {categoryOptions.map((categoryOption) => (
                        <option className="py-2"
                          key={categoryOption.value}
                          value={categoryOption.value}
                        >
                          {categoryOption.label}
                        </option>
                      ))}
                    </select>
                  </div>}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2">
                <Button onClick={()=>handleReport(comment?._id)} disabled={reportedCommentId!== comment?._id || comment?.isReported || feedback==="select" } className="rounded-xl bg-red-500">Report</Button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Comments;