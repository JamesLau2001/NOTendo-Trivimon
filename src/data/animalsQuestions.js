import { questionData } from "../utils/questionData.js";
import { shuffleArray } from "../utils/shuffleArray.js";

export const getAllAnimalQuestions = () => {
  return Promise.all([
    // questionData(7, 27, "easy"),
    questionData(15, 27, "medium"),
    // questionData(3, 27, "hard"),
  ]).then((data) => {
    return data;
  }).then((data) => {
    return shuffleArray(data.flat(Infinity));
  });
};



