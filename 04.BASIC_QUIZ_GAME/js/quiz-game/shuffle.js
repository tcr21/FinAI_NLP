function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[swapIndex];
    shuffledArray[swapIndex] = temp;
  }
  return shuffledArray;
}
// Means we can name the function as we import it in our file
export default shuffle;
