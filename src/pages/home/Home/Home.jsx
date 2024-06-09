import Banner from "../Banner/Banner";
import Container from "../../../components/container/Container"
import PostContainer from "../Post/FeaturedPost";
import { useEffect, useState } from "react";
import useSearchPostByTag from "@/hooks/useSearchPostByTag";
import { Helmet } from "react-helmet-async";

const Home = () => {

  const [keyword, setKeyword] = useState('')
  const [sorted, setSorted] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const [postByTag, postsByTagLoading, refetchPostsByTag, count] = useSearchPostByTag(keyword, sorted, currentPage)

  const [displayPosts, setDisplayPosts] = useState([])

  useEffect(() => {
    if (!postsByTagLoading) {
      setDisplayPosts(postByTag);
    }
  }, [postsByTagLoading, postByTag])

  return (
    <Container>
      <Helmet>
        <title>CF | Home</title>
      </Helmet>
      <Banner
        setCurrentPage={setCurrentPage}
        setKeyword={setKeyword}
        refetchPostsByTag={refetchPostsByTag}></Banner>
      <PostContainer
        count={count}
        setSorted={setSorted}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setKeyword={setKeyword}
        setDisplayPosts={setDisplayPosts}
        displayPosts={displayPosts}
        postsByTagLoading={postsByTagLoading}
        refetchPostsByTag={refetchPostsByTag}></PostContainer>
    </Container>
  );
};

export default Home;