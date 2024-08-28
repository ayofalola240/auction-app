// export default HomePage;
import React from "react";
const HomePage = ({ currentUser }) => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {currentUser ? <p>Hello, {currentUser.firstName}! You are logged in.</p> : <p>You are not logged in. Please log in to access more features.</p>}
    </div>
  );
};

export default HomePage;
