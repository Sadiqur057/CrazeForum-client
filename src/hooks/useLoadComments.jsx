import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const useLoadComments = (id, currentPage) => {
  const axiosCommon = useAxiosCommon()
  const { data = {result : [], commentCounts:0}, isLoading: isCommentsLoading, refetch:refetchComments } = useQuery({
    queryKey: ['comments',id, currentPage],
    queryFn: async () => {
      const res = await axiosCommon.get(`/comments/${id}?page=${currentPage}`)
      return res.data
    }
  })
  const comments = data.result;
  const commentCounts = data.commentCounts;
  return [comments, isCommentsLoading, refetchComments, commentCounts]
};

export default useLoadComments;