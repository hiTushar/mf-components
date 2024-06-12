import './App.css'
import Slider from './components/Slider/Slider'
import data from './data/data.json';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <Slider 
          data={data}
        />
      </div>
    </div>
  )
}

export default App
