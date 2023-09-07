"use client";

import { useEffect } from "react";

export default function Cookie() {
  useEffect(() => {
    if (document) {
      //   console.log(document.cookie);
      document.cookie = `providerRefreshToken=test; Secure; HttpOnly; Path=/ Max-Age=3600;`;
    }
  }, []);

  return <div>Cookie</div>;
}
