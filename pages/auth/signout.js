import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const SignoutPage = () => {
  const { doRequest, errors } = useRequest({
    url: "/auth/signout", // The logout endpoint
    method: "post",
    onSuccess: () => Router.push("/"), // Redirect to the homepage on success
  });

  useEffect(() => {
    const signOut = async () => {
      await doRequest();
    };

    signOut();
    // Adding an empty dependency array ensures this only runs once
  }, []); 

  return (
    <div>
      <h1>Signing you out...</h1>
      {errors && <div>{errors}</div>}
    </div>
  );
};

export default SignoutPage;
