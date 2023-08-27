const msToMinSec = (ms: any) => {
  const minutes: any = Math.floor(ms / 60000);
  const seconds: any = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const formatDate = (date: Date) => {
  const dateAsDateObj = new Date(date);
  const options: any = { year: "numeric", month: "short" };
  return dateAsDateObj.toLocaleDateString("en-US", options);
};

export { msToMinSec, formatDate };
