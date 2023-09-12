import { getCookie, setCookie, hasCookie } from "cookies-next";

const checkToken = async () => {
  // Add try catch
  const accessToken = getCookie("providerAccessToken");
  if (accessToken) {
    return {
      data: { access_token: accessToken },
      error: null,
    };
  }
  // const providerRefreshToken = getCookie("providerRefreshToken");
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify/?providerRefreshToken=${providerRefreshToken}`
    `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify`
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
  }
  if (error) console.log(error);
  return { data, error };
};

export { checkToken };
