

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/pages/Home'
import ShowCreators from './components/pages/ShowCreators';
import ViewCreator from './components/pages/ViewCreator';
import EditCreator from './components/pages/EditCreator';
import AddCreator from './components/pages/AddCreator';
function App() {
  

  return (
    <Router>
      <div>
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path="/creators" element={<ShowCreators />} />
          <Route path="/creator/:id" element={<ViewCreator />} />
          <Route path="/edit-creator/:id" element={<EditCreator />} />
          <Route path="/add-creator" element={<AddCreator />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
