import axios from "axios";
import HomePage from "../components/homePage";

const LandingPage = ({ currentUser }) => {
  console.log("We are on the browser");
  return <HomePage currentUser={currentUser} />;
};

LandingPage.getInitialProps = async ({ req }) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let data;

    if (typeof window === "undefined") {
      // We are on the server
      console.log("Server-side request");
      const response = await axios.get(`${baseURL}/users/user-details`, {
        headers: req.headers,
      });
      data = response.data;
    } else {
      // We are on the browser
      console.log("Client-side request");
      const response = await axios.get(`${baseURL}/users/user-details`);
      data = response.data;
    }
    return { currentUser: data.user || null };
  } catch (error) {
    console.log("Error fetching current user:", error.response ? error.response.data : error.message);
    return { currentUser: null };
  }
};

export default LandingPage;
