import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  console.log("Current user in AppComponent: ", currentUser);
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { data } = await client.get(`${baseURL}/users/user-details`);

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.user);
    }

    console.log("API Response data: ", data);

    return {
      pageProps,
      currentUser: data.user || null, // Ensure currentUser is set properly
    };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return {
      pageProps: {},
      currentUser: null,
    };
  }
};

export default AppComponent;
