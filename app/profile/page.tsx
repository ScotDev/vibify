"use client";

// Local component imports
import Profile from "../components/Profile";

// I would much prefer to use next js on the server, but I've run into too many issue with cookies
// The work-around is simply to bypass the server and use the client directly
// https://github.com/vercel/next.js/issues/49373

export default function page() {
  return (
    <>
      <Profile />
    </>
  );
}
