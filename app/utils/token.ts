import { getCookie, setCookie, hasCookie } from "cookies-next";

const checkToken = async () => {
  // const cookieStore = cookies();
  const hasAccessToken = hasCookie("providerAccessToken");
  if (hasAccessToken) {
    return {
      data: { access_token: getCookie("providerAccessToken") },
      error: null,
    };
  }
  const providerRefreshToken = getCookie("providerRefreshToken");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify/?providerRefreshToken=${providerRefreshToken}`
  );
  const { data, error } = await res.json();
  const date = new Date(0);
  const oneHour = new Date(date.setSeconds(3600));
  if (data) {
    setCookie("providerAccessToken", data.access_token, {
      maxAge: 3600,
      expires: oneHour,
      secure: true,
    });
    console.log("cookies set", data.access_token);
  }

  console.log(data, error);
  return { data, error };
};

export { checkToken };
