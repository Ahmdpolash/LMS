export const generateStudentId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const getRandLetter = () =>
    letters[Math.floor(Math.random() * letters.length)];
  const getRandDigit = () => Math.floor(Math.random() * 10);
  const year = new Date().getFullYear();

  return `STU${year}${getRandLetter()}${getRandDigit()}${getRandLetter()}${getRandDigit()}`;
};
