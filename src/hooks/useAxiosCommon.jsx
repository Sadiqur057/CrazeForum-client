import axios from "axios";

const axiosCommon = axios.create({
  baseURL: 'https://craze-forum-server.vercel.app/'
})
const useAxiosCommon = () => {
  return axiosCommon
};
export default useAxiosCommon;