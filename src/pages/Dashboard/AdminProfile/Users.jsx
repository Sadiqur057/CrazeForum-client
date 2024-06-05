import useAxiosCommon from "@/hooks/useAxiosCommon";
import { Button } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Users = () => {
  const axiosCommon = useAxiosCommon()
  const {data:users, isLoading, refetch} = useQuery({
    queryKey:['users'],
    queryFn: async()=>{
      const res = await axiosCommon.get('/users')
      return res.data
    }
  })

  const {mutate} = useMutation({
    mutationFn: async(userId)=>{
      const res = await axiosCommon.put(`/user/${userId}`)
      if(res.data.modifiedCount>0){
        console.log('success')
        refetch()
        
      }
    }
  })

  const handleMakeAdmin = (id)=>{
    console.log("Make Admin",id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id)
        Swal.fire({
          title: "Success!",
          text: "The user role has changed to Admin",
          icon: "success"
        });
      }
    });
    
  }
  
  if(isLoading){
    return "loading"
  }


  return (
    <div className='p-5 overflow-auto'>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className=" py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></th>
            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <button className="flex items-center gap-x-3 focus:outline-none">
                <span>User name</span>
              </button>
            </th>

            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              User email
            </th>
            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              Subscription Status
            </th>


            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {
            users.map((user, idx) => <tr key={user._id}>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{idx+1}</td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <h2 className="font-medium text-gray-800 dark:text-white ">{user?.name}</h2>
              </td>
              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                {user?.email}
              </td>
              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                {user?.badge}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2">
                <Button disabled={user?.isAdmin} className="rounded-xl bg-c-primary" onClick={()=>handleMakeAdmin(user?._id)}> {user?.isAdmin?"Admin":"Make Admin"}</Button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Users;