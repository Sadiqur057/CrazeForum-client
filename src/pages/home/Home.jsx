import Banner from "./Banner/Banner";
import Container from "../../components/container/Container"
import Post from "./Post/Post";
const Home = () => {
  return (
    <Container>
      <Banner></Banner>
      <div className="grid grid-cols-12">
        <Post></Post>
      </div>
    </Container>
  );
};

export default Home;