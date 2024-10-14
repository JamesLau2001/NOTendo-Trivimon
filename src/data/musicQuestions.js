
import { questionData } from "../utils/questionData.js";
import { shuffleArray } from "../utils/shuffleArray.js";

export const getAllMusicQuestions = () => {
  return Promise.all([
    // questionData(7, 12, "easy"),
    questionData(15, 12, "medium"),
    // questionData(3, 12, "hard"),
  ]).then((data)=>{
    return data
  }).then((data)=>{
    return shuffleArray(data.flat(Infinity))
  })
};




