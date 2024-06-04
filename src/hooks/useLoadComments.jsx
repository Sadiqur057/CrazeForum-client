import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const useLoadComments = () => {
  const axiosCommon = useAxiosCommon()
  const { data: comments = [], isLoading: isCommentsLoading, refetch:refetchComments } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const res = await axiosCommon.get('/comments')
      return res.data
    }
  })
  return [comments, isCommentsLoading, refetchComments]
};

export default useLoadComments;