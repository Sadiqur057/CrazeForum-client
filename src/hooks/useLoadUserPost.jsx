import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/proviers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const useLoadUserPost = (currentPage) => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext)
  const { data= {result : [], userPostCounts : 0}, isLoading, refetch: refetchPosts } = useQuery({
    queryKey: ['post', user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${user?.email}?page=${currentPage}`)
      console.log(res.data)
      return res.data
    }
  })
  const posts = data.result;
  const userPostCount = data.userPostCounts
  return [posts, isLoading, refetchPosts, userPostCount]
};

export default useLoadUserPost;