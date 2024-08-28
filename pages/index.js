
import buildClient from "../api/build-client";
import HomePage from "../components/homePage";

const LandingPage = ({ currentUser }) => {
  console.log("We are on the browser");
  return <HomePage currentUser={currentUser} />;
};
LandingPage.getInitialProps = async (ctx) => {
  try {
    const client = buildClient(ctx);

    const { data } = await client.get("/users/user-details");
    return { currentUser: data.user || null };
  } catch (error) {
    console.log("Error fetching current user:", error.response ? error.response.data : error.message);
    return { currentUser: null };
  }
};

export default LandingPage;
