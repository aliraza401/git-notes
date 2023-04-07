// export const createAgo = (userDateinput: string) => {
//   if (!userDateinput) return null;
//   var difference = Date.now() - userDateinput.getTime();
//   const ageDate = new Date(difference);
//   const newDate = Math.abs(ageDate.getUTCFullYear() - 1970);
//   return newDate;
// };

export const fetchFile = async (url: string) => {
  const file = await fetch(url);
  return file;
};
