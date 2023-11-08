import { ButtonGroup, Button } from '@mui/material';

const Header = ({data}) => {
  return (
    <div className='w-fit mx-auto mt-5 bg-white'>
      <ButtonGroup 
        variant="outlined" 
        color="secondary"
      >
        <Button onClick={() => data(0)}>Create Test</Button>
        <Button onClick={() => data(1)}>Attempt Test</Button>
      </ButtonGroup>
  </div>
  )
}

export default Header