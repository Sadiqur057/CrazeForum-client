
import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useSearchPostByTag = (tag, sorted, currentPage) => {
  const axiosCommon = useAxiosCommon();
  const { data = { count: 0, result: [] }, isLoading: postsByTagLoading, refetch: refetchPostsByTag } = useQuery({
    queryKey: [tag, sorted, currentPage],
    queryFn: async () => {
      const res = await axiosCommon.get(`/postByTag/?tag=${tag}&sorted=${sorted}&page=${currentPage}`)
      console.log(res.data)
      return res.data
    }
  })
  const count = data?.count;
  const postsByTag = data?.result;
  return [postsByTag, postsByTagLoading, refetchPostsByTag, count]

};

export default useSearchPostByTag;