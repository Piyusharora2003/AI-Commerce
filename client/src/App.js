import './App.css';
import { Routes, Route ,useLocation} from "react-router-dom";
import { lazy, Suspense } from 'react';
import { useDispatch } from'react-redux';

const Home = lazy(() => import('./components/Home/Home.js'));
const Error = lazy(() => import('./components/Error/Error.js'));

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (
    // Loading component inside the fallback
    <Suspense fallback={<>Loading...</>}>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error/>} />
      </Routes>
    </Suspense>
  );
}

export default App;
