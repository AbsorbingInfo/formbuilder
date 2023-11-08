import { useState } from "react"
import Header from "./components/Header"
import CreateForm from "./pages/CreateForm"
import Form from "./pages/Form"
import Submitted from "./pages/Submitted"

function App() {
  const [ currentPage, setCurrentPage] = useState(1)

  return (
    <div>
      <Header data={setCurrentPage}/>
      <div>
        {
          currentPage === 0 ?
          <CreateForm /> :
          currentPage === 1 ?
          <Form data={setCurrentPage} />:
          <Submitted /> 
        }
        
      </div>
    </div>
  )
}

export default App
