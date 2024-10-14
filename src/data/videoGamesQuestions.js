import { questionData } from "../utils/questionData.js";
import { shuffleArray } from "../utils/shuffleArray.js";

export const getAllVideoGameQuestions = () => {
  return Promise.all([
    // questionData(7, 15, "easy"),
    questionData(15, 15, "medium"),
    // questionData(3, 15, "hard"),
  ]).then((data) => {
    return data;
  }).then((data)=>{
    return shuffleArray(data.flat(Infinity))
  })
};



