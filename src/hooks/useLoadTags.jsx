import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const useLoadTags = () => {
  const axiosCommon = useAxiosCommon()
  const { data: tags = [], refetch: refetchTags, isLoading: isTagsLoading } = useQuery({
    queryKey: ['tag'],
    queryFn: async () => {
      const res = await axiosCommon.get('/tags')
      console.log("use load tags calling",res.data)
      return res.data
    }
  })
  return [tags, refetchTags, isTagsLoading]
};

export default useLoadTags;