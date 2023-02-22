import './App.css';
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';
import { useGlobalContext } from './context/context';



function App() {
  const { showModal, favourites } = useGlobalContext()
  return (
    <main>
    { favourites.length > 0 && <Favourites /> }
      <Search />
      <Meals />

    {/* Only if showModal is true then display <Modal> */}
      { showModal && <Modal /> }

    </main>
  );
}

export default App;
