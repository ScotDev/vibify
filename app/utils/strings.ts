const getSubstrings = (str: string, delimiter: string) => {
  if (str.includes(delimiter)) {
    const substrings = str.split(delimiter);
    return substrings;
  } else {
    return null;
  }
};
export { getSubstrings };
