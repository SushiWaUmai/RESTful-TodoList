import React from "react";

export const VerifyEmail = ({ user }: any) => ({
  subject: "Verify your account for RESTful Todolist",
  body: (
    <div>
      <h1>Hello {user.username}</h1>
      Verify your account under{" "}
      <a href={`http://localhost:3000/verify?userrole=${user.role}`}>
        this
      </a>{" "}
      link.
    </div>
  ),
});
