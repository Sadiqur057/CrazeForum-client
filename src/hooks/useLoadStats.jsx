import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useLoadStats = () => {
  const axiosSecure = useAxiosSecure()
  const { data: stats = {}, isLoading: isStatsLoading,refetch:refetchStats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stats')
      console.log(res.data)
      return res.data;
    }
  })
  return [stats,isStatsLoading, refetchStats]
};

export default useLoadStats;