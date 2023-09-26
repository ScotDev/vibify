import { getCookie, setCookie, hasCookie, getCookies } from "cookies-next";

import { cookies } from "next/headers";

const checkToken = async () => {
  const date = new Date(0);
  const oneHour = new Date(date.setSeconds(3600));
  // Add try catch
  const providerRefreshToken = cookies().get("providerRefreshToken")?.value;
  const accessToken = cookies().get("providerAccessToken")?.value;
  // console.log(6, cookies().getAll());
  console.log(5, "token.ts", accessToken);
  if (accessToken) {
    console.log(8, "access token exists");
    return {
      data: { access_token: accessToken },
      error: null,
      status: 200,
    };
  }
  console.log(14, "Requesting new token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify/?providerRefreshToken=${providerRefreshToken}`
    // `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify`
  );
  const { data, error, status } = await res.json();

  console.log(21, "token.ts", data.access_token, error);
  if (data.access_token) {
    // setCookie("providerAccessToken", data.access_token, {
    //   maxAge: 3600,
    //   expires: oneHour,
    //   secure: true,
    //   // Cannot be httpOnly, prevents client side access
    // });
    cookies().set("providerAccessToken", data.access_token, {
      maxAge: 3600,
      expires: oneHour,
      // secure: true,
      // Cannot be httpOnly, prevents client side access
    });
  }
  if (!data.access_token || error) console.log(error);
  return { data, error, status };
};

export { checkToken };
