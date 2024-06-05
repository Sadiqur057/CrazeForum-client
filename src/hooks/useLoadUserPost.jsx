import useAxiosCommon from "@/hooks/useAxiosCommon";
import { AuthContext } from "@/proviers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const useLoadUserPost = () => {
  const axiosCommon = useAxiosCommon()
  const { user } = useContext(AuthContext)
  const { data: posts = [], isLoading, refetch: refetchPosts } = useQuery({
    queryKey: ['post', user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/posts/${user?.email}`)
      return res.data
    }
  })
  return [posts, isLoading, refetchPosts]
};

export default useLoadUserPost;