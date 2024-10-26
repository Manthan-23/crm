import { Box } from '@mui/material';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Index from './components/Index component/Index.jsx';
import Chat from './components/chat component/Chat.jsx';
import { Grade } from '@mui/icons-material';
import Graph from './components/graph component/Graph.jsx';
import Recommend from './components/recommend component/Recommend.jsx';


function App() {

  return (
    <>


      {/* <Box sx={{ display: 'flex' }}>
        <Index />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: '240px' },
            mt: '20px'
          }}
        >

        </Box>
          <Router>
          <Routes>
            <Route path="/chatbot" element={<Chat />} />
           
          </Routes>
          </Router> */}

      

      {/* { */}

       
          
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path='/graph' element={<Graph/>} />
              <Route path='/recommend' element={<Recommend/>} />
        
            </Routes>
         
         

          </>

  )
      

    




  
}

export default App
