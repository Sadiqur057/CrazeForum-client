import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from './useAxiosCommon';

const useLoadAnnouncements = () => {
  const axiosCommon = useAxiosCommon()
  const {data:announcements=[], isLoading} = useQuery({
    queryKey: ['announcement'],
    queryFn: async()=>{
      const res = await axiosCommon.get('/announcements');
      return res.data
    }
  })
  return [announcements, isLoading]
};

export default useLoadAnnouncements;