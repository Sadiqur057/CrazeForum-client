
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useLoadUser = (username,page) => {
  console.log(username,page)
  const axiosSecure = useAxiosSecure()
  const {data = {result : [], count: 0}, refetch:refetchUsers, isLoading: isUserLoading} = useQuery({
    queryKey:['users',username,page],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/user/?username=${username}&page=${page}`)
      return res.data;
    }
  })
  const users = data.result;
  const userCount =  data.count;
  return [users, isUserLoading, refetchUsers, userCount]
};

export default useLoadUser;