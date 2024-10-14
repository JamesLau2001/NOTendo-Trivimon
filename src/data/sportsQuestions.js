import { questionData } from "../utils/questionData.js";
import { shuffleArray } from "../utils/shuffleArray.js";

export const getAllSportsQuestions = () => {
  return Promise.all([
    // questionData(7, 21, "easy"),
    questionData(15, 21, "medium"),
    // questionData(3, 21, "hard"),
  ])
    .then((data) => {
      return data;
    })
    .then((data) => {
      return shuffleArray(data.flat(Infinity));
    });
};

