// const msToMinSec = (ms: any) => {
//   if (!ms) return "0:00";
//   const minutes: any = Math.floor(ms / 60000);
//   const seconds: any = ((ms % 60000) / 1000).toFixed(0);
//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// };

const msToMinSec = (ms: any) => {
  if (!ms) return "0:00";
  const totalSeconds: any = Math.floor(ms / 1000);
  const hours: any = Math.floor(totalSeconds / 3600);
  const minutes: any = Math.floor((totalSeconds % 3600) / 60);
  const seconds: any = totalSeconds % 60;
  const formattedMinutes: any = minutes < 10 ? `${minutes}` : minutes;
  const formattedSeconds: any = seconds < 10 ? `0${seconds}` : seconds;
  if (hours > 0) {
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
};

const formatDate = (date: Date) => {
  const dateAsDateObj = new Date(date);
  const options: any = { year: "numeric", month: "short" };
  return dateAsDateObj.toLocaleDateString("en-US", options);
};

export { msToMinSec, formatDate };
