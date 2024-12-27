import { TopNavigation } from "../components";

interface HomeProps {
  data: string;
}

const Home = (props: HomeProps) => {
  return (
    <>
      <TopNavigation />
      <div>Home</div>
      <div>{JSON.stringify(props.data)}</div>
    </>
  );
};
export async function getInitialProps() {
  const response = await (
    await fetch("https://jsonplaceholder.typicode.com/photos")
  ).json();
  return { data: response };
}
export default Home;
