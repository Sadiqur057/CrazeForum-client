import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useLoadUserPost from "@/hooks/useLoadUserPost";
import useLoadTags from "@/hooks/useLoadTags";
import useLoadUserBadge from "@/hooks/useLoadUserBadge";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const [categoryValue, setCategoryValue] = useState("coding");
  const [posts, isLoading] = useLoadUserPost()
  const [badgeData, , isBadgeLoading] = useLoadUserBadge()
  const [tags] = useLoadTags()


  const handleCategoryOptions = (e) => {
    console.log(e.target.value)
    setCategoryValue(e.target.value);
  };


  const { mutate } = useMutation({
    mutationFn: (postDetails) => {
      axiosSecure.post("/post", postDetails)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "You have added the post",
              icon: "success",
              confirmButtonColor: "#35a483",
            }).then(() => {
              navigate('/dashboard/userPost')
            })
          }

        })
    }
  })



  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const author_image = user?.photoURL;
    const author_name = user?.displayName;
    const author_email = user?.email;
    const post_title = form.postTitle.value;
    const description = form.description.value;
    const tag = categoryValue;
    const up_vote_count = 0;
    const down_vote_count = 0;
    const posted_time = new Date().toLocaleDateString()
    const postDetails = {
      author_image,
      author_email,
      author_name,
      post_title,
      description,
      tag,
      up_vote_count,
      down_vote_count,
      posted_time
    };
    console.log(postDetails)

    if (posts.length < 5 || badgeData.badge === 'gold') {
      mutate(postDetails);
    } else {
      Swal.fire({
        title: "Post Limit Reached!",
        text: "Please purchase the Gold badge to get unlimited post and comment facility",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "View Packages"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/membership')
        }
      });
    }
  }


  if (isLoading || isBadgeLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="p-3 md:p-5">
      <Helmet>
        <title>CF | Add Post</title>
      </Helmet>
      <section className="py-5 bg-gray-200 dark:bg-gray-900  rounded-md">
        {
          posts.length < 5 || badgeData.badge === 'gold' ? <form
            onSubmit={handleAddPost}
            className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-4 md:px-10 pb-5"
          >
            <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="text-center font-bold text-2xl md:text-3xl py-8">
                  Add Post
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full">
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="postTitle">Post Title</label>
                  <input type="text" name="postTitle" id="postTitle"
                    required className="w-full p-[7px] rounded-md bg-gray-100 dark:bg-gray-800 mt-1 outline-none" placeholder="Post Title" />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div>
                    <label htmlFor="category">Tag</label>
                    <select
                      required
                      id="category"
                      onChange={handleCategoryOptions}
                      className="w-full mt-1 p-[10px] rounded-md dark:bg-gray-800 bg-gray-100 outline-none"
                    >
                      {tags.map((tag) => (
                        <option className="py-2"
                          key={tag.tagName}
                          value={tag.tagName}
                        >
                          {tag.tagName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="col-span-full">
                  <div className=" w-full">
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
          </form> : <div className="flex flex-col gap-4 justify-center w-[90%] mx-auto py-14 md:py-20 items-center h-fit text-center">
            <h2 className="text-3xl font-bold">Post Limit Reached!</h2>
              <p>Please purchase the Gold badge to get unlimited post and comment facility and enjoy all the services lifetime without any limitations.</p>
            <Link to='/membership'>
              <button className="bg-c-secondary px-3 py-2 rounded-md">Become a Member</button>
            </Link>
          </div>
        }
      </section>
    </div>
  );
};

export default AddPost;