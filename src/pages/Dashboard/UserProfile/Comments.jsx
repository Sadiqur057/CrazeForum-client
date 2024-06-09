import useAxiosCommon from "@/hooks/useAxiosCommon";
import useLoadComments from "@/hooks/useLoadComments";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const Comments = () => {
  const { postId } = useParams()
  const [currentPage, setCurrentPage] = useState(0)
  const [comments, isLoading, refetchComments, commentCounts] = useLoadComments(postId, currentPage)
  const [feedback, setFeedback] = useState(null)
  const [reportedCommentId, setReportCommentId] = useState(null)

  const axiosCommon = useAxiosCommon()
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const categoryOptions = [
    { label: "Select Feedback", value: 'select' },
    { label: "Break rules", value: "Break rules" },
    { label: "Abusive behavior", value: "Abusive behavior" },
    { label: "Harmful", value: "Harmful" }
  ];

  const handleCategoryOptions = (e, commentId) => {
    const category = e.target.value;
    console.log(feedback)
    setFeedback(category);
    setReportCommentId(commentId)
  };

  const { mutate } = useMutation({
    mutationFn: async ({ id, feedback }) => {
      const res = await axiosCommon.put(`/comment/?id=${id}&feedback=${feedback}`)

      console.log(res.data)

      if (res.data.modifiedCount > 0) {
        console.log('success')
        toast.success("This comment has been reported")
        refetchComments()
      }

    }
  })

  const [commentDetails, setCommentDetails] = useState()

  const handleViewComment = (comment) => {
    handleOpen()
    setCommentDetails(comment)
  }



  const handleReport = (id) => {
    const reportDetails = {
      id, feedback
    }
    console.log(reportDetails)
    mutate(reportDetails)
  }

    // pagination related
    const itemsPerPage = 10;
    const numOfPages = Math.ceil(commentCounts / itemsPerPage)
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

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className='p-3 md:p-5 overflow-auto'>
      <Helmet>
        <title>CF | Commentse</title>
      </Helmet>
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
                {comment?.comment.length <= 20
                  ? comment?.comment
                  : <>
                    {comment?.comment.slice(0, 21)}... <p className="text-xs inline cursor-pointer bg-c-secondary w-fit px-2 py-1 rounded-md" onClick={() => handleViewComment(comment?.comment)} >
                      Read More
                    </p></>}
                <Dialog open={open} handler={handleOpen}>
                  <DialogBody>
                    {commentDetails}
                  </DialogBody>
                  <DialogFooter>
                    <button
                      onClick={handleOpen}
                      className="mr-1 bg-red-500 py-1 text-white px-3 rounded-md text-sm"
                    >
                      <span>close</span>
                    </button>

                  </DialogFooter>
                </Dialog>
              </td>
              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                {comment?.feedback ? "Submitted" :
                  <div>
                    <select
                      required
                      id="category"
                      onChange={() => handleCategoryOptions(event, comment?._id)}
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
                <Button onClick={() => handleReport(comment?._id)} disabled={reportedCommentId !== comment?._id || comment?.isReported || feedback === "select"} className="rounded-xl bg-red-500">Report</Button>
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

export default Comments;