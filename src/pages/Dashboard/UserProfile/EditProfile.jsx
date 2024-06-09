import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()


  const {mutate}= useMutation({
    mutationKey:[user?.email, 'editProfile'],
    mutationFn: async(data)=>{
      const res = await axiosSecure.put(`/editProfile/${user?.email}`,data)
      if(res.data.modifiedCount>0){
        toast.success("Your profile has been updated")
        navigate('/dashboard/userProfile')
      }
    }
  })

  const handleEditProfile = (e)=>{
    e.preventDefault()
    const bio = e.target.bio.value;
    const name = e.target.name.value
    const updatedInfo = {bio,name}
    mutate(updatedInfo)
    console.log("ok")
  }


  return (
    <div className="p-3 md:p-5">
      <Helmet>
        <title>CF | Edit Profile</title>
      </Helmet>
      <section className="py-5 bg-gray-200 dark:bg-gray-900  rounded-md">
        <form
          onSubmit={handleEditProfile}
          className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-4 md:px-10 pb-5"
        >
          <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-center font-bold text-2xl md:text-3xl py-8">
                Edit Profile
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="name">Name</label>
                <input readOnly defaultValue={user?.displayName} type="text" name="name" id="name"
                  required className="w-full p-[7px] rounded-md bg-gray-100 dark:bg-gray-800 mt-1 outline-none" placeholder="Your name" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email">Email</label>
                <input readOnly defaultValue={user?.email} type="email" name="email" id="email"
                  required className="w-full p-[7px] rounded-md bg-gray-100 dark:bg-gray-800 mt-1 outline-none" placeholder="Email" />
              </div>

              <div className="col-span-full">
                <div className=" w-full">
                  <label htmlFor="desc">Bio</label>
                  <textarea
                    id="desc"
                    name="bio"
                    placeholder="Write about yourself"
                    className="bg-gray-100 h-[200px] w-full p-2 rounded-md dark:bg-gray-800 mt-1 outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-full">
                <input
                  type="submit"
                  value="Submit"
                  className="bg-c-primary hover:bg-c-hover btn btn-neutral border-none py-2 rounded-lg text-white w-full"
                />
              </div>
            </div>
          </fieldset>
        </form>

      </section>
    </div>
  );
};

export default EditProfile;