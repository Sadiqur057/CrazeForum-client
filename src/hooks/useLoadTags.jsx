import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const useLoadTags = () => {
  const axiosCommon = useAxiosCommon()
  const { data: tags = [], refetch:refetchTags} = useQuery({
    queryKey: ['tag'],
    queryFn: async () => {
      const res = await axiosCommon.get('/tags')
      return res.data
    }
  })
  return [tags,refetchTags]
};

export default useLoadTags;