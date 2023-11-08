export const getQuestionData = (type) => {
  if(type === 'categorize'){
    return {
      id:1,
      type: "categorize",
      isRequired: false,
      questionData: {
        question: "", 
        categories: [
          {
            id: 1,
            category: "",
          }
        ],
        options: [
          {
            id: 1,
            option: "",
            belongsTo: "",
          }
        ],
      },
    }
  }else if(type === 'cloze'){
    return {
      id:1,
      type: "cloze",
      isRequired: false,
      questionData: {
        question: "",
        dashs: [
        ],
      },
    }
  }else if(type === 'comprehension'){
    return {
      id:1,
      type: "comprehension",
      isRequired: false,
      questionData: {
        description: "", 
        mcqs: [
          {
            id: 1,
            question: "", 
            options: [
              {
                id: 1,
                option: "",
                isCorrect: false,
              },
              {
                id: 2,
                option: "",
                isCorrect: false,
              },
              {
                id: 3,
                option: "",
                isCorrect: false,
              },
              {
                id: 4,
                option: "",
                isCorrect: false,
              }
            ],
          }
        ],
      },
    }
  }
}

export const swapPositions = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  return array
}
