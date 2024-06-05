
import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useSearchPostByTag = (tag) => {
  const axiosCommon = useAxiosCommon();
  const {data: postsByTag = [], isLoading: postsByTagLoading, refetch:refetchPostsByTag } = useQuery({
    queryKey: [tag],
    queryFn: async()=>{
      const res = await axiosCommon.get(`/postByTag/${tag}`)
      console.log(res.data)
      return res.data
    }
  })
  return [postsByTag, postsByTagLoading, refetchPostsByTag]

};

export default useSearchPostByTag;