import { useState, useEffect } from "react"
import Categorize from "../components/categorize/Categorize"
import Comprehension from "../components/comprehension/Comprehension"
import Cloze from "../components/cloze/Cloze"
import { Button, TextField, InputLabel  } from '@mui/material'
import { getQuestionData } from "../utils.js/helper"
import { v4 as uuidv4 } from 'uuid';

const CreateForm = () => {
  const [formName, setFormName] = useState('')
  const [questions, setQuestions] = useState([])
  const [questionId, setQuestionId] = useState(1)
  const [imageFiles, setImageFiles] = useState([])
  const uniqueFormId = uuidv4();

  const handleAddQuestion = (type) => {
    const question = getQuestionData(type)
    setQuestions(prevQuestions => [
      ...prevQuestions, 
      {
        id: questionId,
        type: question.type,
        isRequired: false,
        questionData: question.questionData
      }
    ]);
    setQuestionId(questionId+1)
  }
  console.log(questions)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  
    formData.append('image', event.target.elements.image.files[0]);
    formData.append('formName', formName);
    formData.append('questions', JSON.stringify(questions));

    questions.forEach((question, index) => {
      if (question.questionData.img) {
        formData.append(`questionImages-${question.id}`, question.questionData.img);
      }
    });
    
    try {
      const response = await fetch('http://localhost:4000/api/form', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <div className="my-8">
      <form onSubmit={handleSubmit}>
      <div>
        <div className='bg-white text-lg mx-auto h-fit w-4/6 p-4 border-teal-600 border-t-8 border-s-0 border-b-0 shadow-slate-700 shadow-md rounded-lg mb-7 border-l-2' >
          <TextField 
            className="text-xl font-medium w-3/6"
            placeholder='Enter form title'
            required
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <div className="mt-2">
            <InputLabel >Choose header image (optional)</InputLabel>
            <TextField 
              className="text-xl block font-medium w-2/6"
              placeholder='Choose header image (optional)'
              name="header"
              id="image"
              type="file"
              max="5242880"
              InputProps={{ inputProps: { accept: 'image/*' } }}
            />
          </div>
        </div>
      </div>
      <div>
        {
          questions.map((question, index) => {
            const props = {
              question: questions[index],
              setQuestions,
              setImageFiles,
              uniqueFormId
            }
            return (
            question.type === 'categorize' ? <Categorize key={index} {...props} /> : 
            question.type === 'cloze' ? <Cloze key={index} {...props} /> : 
            question.type === 'comprehension' ? <Comprehension key={index} {...props} /> : 
            null
          )})

        }
      </div>

      <div className="flex justify-center w-5/12 mx-auto">
        <div onClick={() => handleAddQuestion('cloze')} className='w-3/12 text-lg font-semibold h-12 mx-auto bg-slate-300 flex justify-center items-center rounded-md hover:text-teal-100 hover:bg-slate-700 hover:cursor-pointer' >
          Cloze
        </div>
        <div onClick={() => handleAddQuestion('categorize')} className='w-3/12 text-lg font-semibold h-12 mx-auto bg-slate-300 flex justify-center items-center rounded-md hover:text-teal-100 hover:bg-slate-700 hover:cursor-pointer' >
          Categorize
        </div>
        <div onClick={() => handleAddQuestion('comprehension')} className='w-3/12 text-lg font-semibold h-12 mx-auto bg-slate-300 flex justify-center items-center rounded-md hover:text-teal-100 hover:bg-slate-700 hover:cursor-pointer' >
          Comprehension
        </div>
      </div>

      <div  className='bg-white mt-4 flex justify-end text-lg mx-auto h-fit w-4/6 p-4 shadow-slate-700 shadow-md rounded-lg mb-7 border-l-2' >
        <Button type="submit" variant="contained">Submit</Button>
      </div>
      </form>
    </div>
  )
}

export default CreateForm



let data = {
  "name": "My Form",
  "img": "image_url.jpg",
  questions: [
    {
      type: "cloze", // Specify the question type (e.g., 'cloze', 'comprehension', 'categorize')
      questionData: {
        question: "Your Cloze Question", // Replace with the actual cloze question
        dashIds: [
          {
            dashId: 1, // Replace with the actual dashId
          },
          {
            dashId: 2, // Replace with the actual dashId
          },
          // Add more dashIds if needed
        ],
        options: [
          {
            option: "Option 1", // Replace with the actual option text
            belongsTo: 1, // Reference to dashId or other identifier
          },
          {
            option: "Option 2",
            belongsTo: 2,
          },
          // Add more options if needed
        ],
        required: true, // Specify if the question is required or not
      },
    },
    {
      type: "comprehension",
      questionData: {
        description: "Your Comprehension Question", // Replace with the actual comprehension question
        mcqs: [
          {
            question: "MCQ Question 1", // Replace with the actual MCQ question
            options: [
              {
                option: "Option A", // Replace with the actual option text
                isCorrect: true, // Specify if the option is correct
              },
              {
                option: "Option B",
                isCorrect: false,
              },
              // Add more options if needed
            ],
          },
          {
            question: "MCQ Question 2",
            options: [
              {
                option: "Option X",
                isCorrect: false,
              },
              {
                option: "Option Y",
                isCorrect: true,
              },
              // Add more options if needed
            ],
          },
          // Add more MCQ questions if needed
        ],
        required: false, // Specify if the question is required or not
      },
    },
    {
      type: "categorize",
      questionData: {
        question: "Your Categorize Question", // Replace with the actual categorize question
        categories: [
          {
            category: "Category A", // Replace with the actual category name
          },
          {
            category: "Category B",
          },
          // Add more categories if needed
        ],
        options: [
          {
            option: "Option P", // Replace with the actual option text
            belongsTo: "Category A", // Reference to category or other identifier
          },
          {
            option: "Option Q",
            belongsTo: "Category B",
          },
          // Add more options if needed
        ],
        isRequired: true, // Specify if the question is required or not
      },
    },
    // Add more questions of different types if needed
  ]
}