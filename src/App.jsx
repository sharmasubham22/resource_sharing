import {getDatabase, ref, set} from 'firebase/database'
import {app} from './Firebase'
import './App.css'

const db = getDatabase(app);

function App() {
  const put = () =>{
    set(ref(db,'users/01'),{
      id: 1,
      name: "Subham",
      age: 28
    });
  }
  return (
    <>
      <div>
        <button onClick={put}>Put Data </button>
      </div>
    </>
  )
}

export default App
