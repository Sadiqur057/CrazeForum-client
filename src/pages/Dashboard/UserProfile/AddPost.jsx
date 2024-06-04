import { Select, Option, Input, Textarea } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import useLoadUserPost from "@/hooks/useLoadUserPost";

const AddPost = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon()
  const navigate = useNavigate();
  const [categoryValue, setCategoryValue] = useState("");
  const [posts, isLoading] = useLoadUserPost()




  const categoryOptions = [
    { label: "Comedy", value: "comedy" },
    { label: "Technology", value: "technology" },
    { label: "Coding", value: "coding" },
    { label: "Social", value: "Social" },
    { label: "Music", value: "Musics" },
    { label: "Arts", value: "arts" },
  ];



  const handleCategoryOptions = (value) => {
    setCategoryValue(value);
  };


  const { mutate } = useMutation({
    mutationFn: (postDetails) => {
      axiosCommon.post("/post", postDetails)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "You have added the post",
              icon: "success",
              confirmButtonColor: "#35a483",
            }).then(() => {
              navigate('/')
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

    if (posts.length < 3) {
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
  };


  if (isLoading) {
    return "Loading"
  }

  return (
    <div className="bg-cool p-5">
      <Helmet>
        <title>CF | Add Post</title>
      </Helmet>
      <section className="py-5 bg-gray-900 w-[90%] max-w-4xl  rounded-md bg-cool">
        <form
          onSubmit={handleAddPost}
          className="container flex flex-col mx-auto space-y-12 bg-base-100 rounded-xl px-4ee md:px-10 pb-5"
        >
          <fieldset className=" gap-6 rounded-md p-2 md:p-6 lg:p-10">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-center font-bold text-2xl md:text-3xl py-8">
                Add Post
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full ">
              <div className="col-span-full sm:col-span-3">
                <Input
                  label="Post Title"
                  color="teal"
                  name="postTitle"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div>
                  <Select
                    label="Select Post Category"
                    color="teal"
                    required
                    onChange={handleCategoryOptions}
                  >
                    {categoryOptions.map((categoryOption) => (
                      <Option
                        key={categoryOption.value}
                        value={categoryOption.value}
                      >
                        {categoryOption.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>


              <div className="col-span-full">
                <div className="relative w-full min-w-[200px]">
                  <Textarea
                    required
                    name="description"
                    color="teal"
                    label="Write your queries/contents here"
                    className="h-[200px]"
                  ></Textarea>
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

export default AddPost;