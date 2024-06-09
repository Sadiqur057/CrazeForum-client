import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useLoadUserBadge = () => {
  const axiosCommon = useAxiosCommon()
  const { user } = useAuth()
  const { data: badgeData = {}, isLoading:isBadgeLoading ,refetch:refetchBadge } = useQuery({
    queryKey: ['badge', user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/user/badge/${user?.email}`)
      console.log(res.data)
      return res.data
    }
  })
  return [badgeData, refetchBadge,isBadgeLoading]
};

export default useLoadUserBadge;