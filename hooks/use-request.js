// /hooks/use-request.js
import { useState } from "react";
import buildClient from "../api/build-client";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      const client = buildClient();
      const response = await client[method](url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.error(err);
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            <li>{err.response?.data?.message || "Something went wrong"}</li>
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};