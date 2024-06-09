import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useLoadUser from "@/hooks/useLoadUser";
import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [users, isUserLoading, refetchUsers, userCount] = useLoadUser(searchKeyword, currentPage)



  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.put(`/user/${userId}`)
      if (res.data.modifiedCount > 0) {
        console.log('success')
        refetchUsers()

      }
    }
  })

  const handleMakeAdmin = (id) => {
    console.log("Make Admin", id)
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

  const handleSearchUser = async (e) => {
    e.preventDefault()
    const username = e.target.username.value.toLowerCase()
    console.log(username)
    setSearchKeyword(username)
  }


  // pagination related
  const itemsPerPage = 10;
  const numOfPages = Math.ceil(userCount / itemsPerPage)
  const pages = [...Array(numOfPages).keys()];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  // if (isUserLoading) {
  //   return <LoadingSpinner></LoadingSpinner>
  // }


  return (
    <>
      <Helmet>
        <title>CF | Manage Users</title>
      </Helmet>
      <div className="p-3 md:p-5 flex justify-between items-center gap-3 flex-col md:flex-row">
        <h2 className="text-xl font-bold">Users: {userCount}</h2>
        <form onSubmit={handleSearchUser} className="space-x-3 flex">
          <input type="text" className="w-full rounded-lg py-2 px-3 dark:bg-gray-700 bg-gray-100" placeholder="Search by username" name="username" />
          <input type="submit" className="text-white bg-c-primary rounded-lg py-2 px-3 cursor-pointer" value="Search" />
        </form>
      </div>
      <div className='p-3 md:p-5 overflow-auto'>
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
              isUserLoading ? <td colSpan='5'><LoadingSpinner heightClass={'h-16'}></LoadingSpinner></td> : users.map((user, idx) => <tr key={user._id}>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{idx + 1}</td>
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
                  <Button disabled={user?.isAdmin} className="rounded-xl bg-c-primary" onClick={() => handleMakeAdmin(user?._id)}> {user?.isAdmin ? "Admin" : "Make Admin"}</Button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
        {
          numOfPages ? <div className="pagination flex justify-center gap-4 my-5">
            <button
              className="p-2 px-4 rounded bg-gray-200 dark:bg-gray-700"
              onClick={handlePrevPage}
            >
              Prev
            </button>
            {
              pages.map(page => <button
                className={currentPage === page ? "p-2 px-4 rounded bg-c-primary text-white" : "p-2 px-4 rounded bg-gray-200 dark:bg-gray-700"}
                onClick={() => setCurrentPage(page)}
                key={page}>
                {page + 1}
              </button>)
            }
            <button
              className="p-2 px-4 rounded bg-gray-200 dark:bg-gray-700"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div> : !isUserLoading && <div className="text-center py-20"> No data found</div>
        }
      </div>
    </>
  );
};

export default Users;