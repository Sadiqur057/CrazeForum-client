import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from '@/hooks/useAxiosSecure';

const AddAnnouncement = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (announcementDetails) => {
      axiosSecure.post("/announcement", announcementDetails)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "You have added the Announcement",
              icon: "success",
              confirmButtonColor: "#35a483",
            }).then(() => {
              navigate('/')
            })
          }
        })
    }
  })

  const handleAddAnnouncement = (e) => {
    e.preventDefault()
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const author_image = user?.photoURL;
    const author_name = user?.displayName;
    const announcementDetails = {
      title, description, author_image, author_name
    }
    mutate(announcementDetails)
  }

  return (
    <div className="bg-cool p-3 md:p-5">
      <Helmet>
        <title>CF | Add Announcements</title>
      </Helmet>
      <section className="py-5 bg-gray-200 dark:bg-gray-900  rounded-md bg-cool">
        <form
          onSubmit={handleAddAnnouncement}
          className="container flex flex-col mx-auto space-y-12 rounded-xl px-5 md:px-10 pb-5"
        >
          <fieldset className=" gap-6 rounded-md  md:p-6 lg:p-10">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-center font-bold text-2xl md:text-3xl py-8">
                Add Announcements
              </p>
            </div>
            <div className="grid  gap-4 col-span-full ">
              <div className="">
                <label htmlFor="title" className='block'>Announcement Title</label>
                <input type="text" name="title" id="title"
                  required className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 mt-1 outline-none" placeholder="Write title of the announcement" />
              </div>

              <div className="">
                <div className="w-full">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    id="desc"
                    name="description"
                    placeholder="Write description"
                    className="bg-gray-100 h-[200px] w-full p-2 rounded-md dark:bg-gray-800 mt-1 outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-full">
                <input
                  type="submit"
                  value="Add"
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

export default AddAnnouncement;