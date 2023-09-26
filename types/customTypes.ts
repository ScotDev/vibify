export type SpotifyTokenRequestData = {
  grant_type: string;
  refresh_token: string;
  client_id?: string;
};

export type SpotifyTokenRequestOptions = {
  method: string;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
  body: any;
  json: boolean;
};
