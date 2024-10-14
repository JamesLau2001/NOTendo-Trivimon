import { getBossData } from "../data/apiCalls";

export const bossQuestionData = async (amount, difficulty) => {
  const results = await getBossData(amount, difficulty);

  const questions = results.map((currentQuestion) => ({
    question: currentQuestion.question
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&reg/g, "©")
      .replace(/&amp;/g, "&")
      .replace(/&ouml;/g, "ö")
      .replace(/&deg;/g, "°")
      .replace(/&eacute;/g, "é")
      .replace(/&aacute;/g, "á")
      .replace(/&uacute;/g, "ú")
      .replace(/&oacute;/g, "ó")
      .replace(/&iacute;/g, "í"),
    correctAnswer: currentQuestion.correct_answer
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&reg/g, "©")
      .replace(/&amp;/g, "&")
      .replace(/&ouml;/g, "ö")
      .replace(/&deg;/g, "°")
      .replace(/&eacute;/g, "é")
      .replace(/&aacute;/g, "á")
      .replace(/&uacute;/g, "ú")
      .replace(/&oacute;/g, "ó")
      .replace(/&iacute;/g, "í"),
    incorrectAnswers: currentQuestion.incorrect_answers.map((answer) =>
      answer
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&reg/g, "©")
        .replace(/&amp;/g, "&")
        .replace(/&ouml;/g, "ö")
        .replace(/&deg;/g, "°")
        .replace(/&eacute;/g, "é")
        .replace(/&aacute;/g, "á")
        .replace(/&uacute;/g, "ú")
        .replace(/&oacute;/g, "ó")
        .replace(/&iacute;/g, "í")
    ),
  }));
  return questions;
};
