import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// função que mapeia se a autentificação do usuário foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import { useState, useEffect } from 'react';

// context
import { AuthProvider } from "./context/AuthContext"

// pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/login/login';
import Register from './pages/register/register';

// components
import  Navbar  from './components/Navbar';
import  Footer  from './components/Footer';
import { useAuthentication } from './hooks/useAuthentication';


function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className='App'> 
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>

              <Route path='/' element={<Home />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App
