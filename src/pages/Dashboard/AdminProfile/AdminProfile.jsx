import { AuthContext } from "@/proviers/AuthProvider";
import { useContext } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComments, FaUsers } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { MdOutlineEmail } from "react-icons/md";
import useLoadUserPost from "@/hooks/useLoadUserPost";
import { FaComments } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import { toast } from "react-toastify";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import useLoadTags from "@/hooks/useLoadTags";



const AdminProfile = () => {
  const { user } = useContext(AuthContext)
  const [posts, isLoading] = useLoadUserPost()
  const axiosCommon = useAxiosCommon()

  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosCommon.get('/stats')
      console.log(res.data)
      return res.data;
    }
  })


  const [tags,refetchTags] = useLoadTags()

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosCommon.post('/tags', data)
      if (res.data.insertedId) {
        toast.success("This tag has been added")
        refetchTags()
      }
    }
  })

  const handleAddTag = (e) => {
    e.preventDefault();
    const tagName = e.target.tag.value
    const info = { tagName }
    mutate(info)
  }

  // chart config


  const piChartData = [
    {
      name: "Total Comments", value: stats?.commentCounts
    },
    {
      name: "Total Posts", value: stats?.postCounts
    },
    {
      name: "Total Users", value: stats?.userCounts
    },
  ]


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  console.log(piChartData)

  console.log(posts)
  if (isLoading || isStatsLoading) {
    return <p>Loading</p>
  }
  return (
    <div className="p-5 md:grid grid-cols-12 gap-3 space-y-4 md:space-y-0">
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center lg:items-start lg:flex-row h-fit ">
        <img className="w-14 h-14  rounded-full" src={user?.photoURL} alt="" />
        <div className="w-full flex flex-col items-center lg:items-start">
          <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 capitalize">{user?.displayName}</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-200 flex gap-2 items-center"><MdOutlineEmail></MdOutlineEmail> {user?.email}</p>
        </div>

      </div>
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center h-fit lg:flex-row">
        <div className="bg-gray-100 dark:bg-gray-500 p-3 rounded-full">
          <FaUsers className="text-3xl text-c-primary"></FaUsers>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start">
          <p>Total Users</p>
          <h2 className="text-2xl font-bold">{stats?.userCounts}</h2>
        </div>

      </div>
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center h-fit lg:flex-row">
        <div className="bg-gray-100 dark:bg-gray-500 p-3 rounded-full">
          <LiaCommentSolid className="text-3xl text-c-primary"></LiaCommentSolid>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start">
          <p>Total Posts</p>
          <h2 className="text-2xl font-bold">{stats?.postCounts}</h2>
        </div>

      </div>
      <div className="col-span-6 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col items-center h-fit lg:flex-row">
        <div className="bg-gray-100 dark:bg-gray-500 p-3 rounded-full">
          <FaComments className="text-3xl text-c-primary"></FaComments>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start">
          <p>Total Comments</p>
          <h2 className="text-2xl font-bold">{stats?.commentCounts}</h2>
        </div>

      </div>

      <div className="col-span-5 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 flex-col h-fit">
        <h2 className="font-bold text-lg">Add New Tags</h2>
        <form onSubmit={handleAddTag} className="flex flex-col gap-2">
          <input type="text" className="w-full py-2 px-3 rounded-md dark:bg-gray-700" name="tag" placeholder="Add New Tags" />
          <input type="submit" className="py-2 px-6 rounded-md bg-c-primary" value="Add" />
        </form>
        <h4 className="mt-2 font-semibold text-lg leading-3">Added tags: </h4>
        <div className="flex flex-wrap gap-x-3">{tags.map(tag => <p key={tag?._id}>#{tag?.tagName}</p>)}  </div>
      </div>
      <div className="col-span-7 shadow-custom w-full p-6 bg-white rounded-lg dark:bg-gray-800 flex gap-5 items-center justify-center h-fit">
        <div className="overflow-auto">
          <PieChart width={400} height={400}>
            <Pie
              data={piChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {piChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>

        </div>
      </div>

    </div>
  );
};

export default AdminProfile;