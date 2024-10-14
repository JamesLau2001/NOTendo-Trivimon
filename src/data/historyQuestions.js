import { questionData } from "../utils/questionData.js";
import { shuffleArray } from "../utils/shuffleArray.js";

export const getAllHistoryQuestions = () => {
  return Promise.all([
    // questionData(7, 23, "easy"),
    questionData(15, 23, "medium"),
    // questionData(3, 23, "hard"),
  ])
    .then((data) => {
      return data;
    })
    .then((data) => {
      return shuffleArray(data.flat(Infinity));
    });
};


