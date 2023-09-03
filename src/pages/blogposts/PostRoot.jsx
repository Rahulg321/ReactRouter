import { Outlet } from "react-router-dom";

export default function PostRoot() {
  return (
    <>
      <h2> Navigate your blog posts from here </h2>
      <Outlet />
    </>
  );
}
