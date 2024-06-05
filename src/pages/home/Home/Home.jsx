import Banner from "../Banner/Banner";
import Container from "../../../components/container/Container"
import PostContainer from "../Post/PostContainer";
import { useEffect, useState } from "react";
import useSearchPostByTag from "@/hooks/useSearchPostByTag";

const Home = () => {

  const [keyword, setKeyword] = useState('all')
  const [postByTag, postsByTagLoading, refetchPostsByTag] = useSearchPostByTag(keyword)

  const [displayPosts, setDisplayPosts] = useState([])

  useEffect(() => {
    if (!postsByTagLoading) {
      setDisplayPosts(postByTag);
    }
  }, [postsByTagLoading, postByTag])

  return (
    <Container>
      <Banner
        setKeyword={setKeyword}
        refetchPostsByTag={refetchPostsByTag}></Banner>
      <PostContainer
        setKeyword={setKeyword}
        setDisplayPosts={setDisplayPosts}
        displayPosts={displayPosts}
        postsByTagLoading={postsByTagLoading}
        refetchPostsByTag={refetchPostsByTag}></PostContainer>
    </Container>
  );
};

export default Home;