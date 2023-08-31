const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
    return;
  }
};

export { copyToClipboard };
