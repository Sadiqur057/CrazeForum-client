import Banner from "../Banner/Banner";
import Container from "../../../components/container/Container"
import PostContainer from "../Post/PostContainer";

const Home = () => {

  return (
    <Container>
      <Banner></Banner>
      <PostContainer></PostContainer>
    </Container>
  );
};

export default Home;