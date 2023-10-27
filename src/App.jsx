import useLocalStorage from 'use-local-storage'
import { TodoContext } from './contexts/TodoContext';
import { BrowserRouter,  Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import { AuthContext } from './contexts/AuthContext';
import { UserContext } from './contexts/UserContext';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import EditTodo from './pages/EditTodo';
import AddTodo from './pages/AddTodo';
import SignUp from './pages/SignUp';
import BMICalculator from './pages/BmiCalculator';
import Welcome from './pages/Welcome';
import CustomNavbar from './components/Navbar';

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [users, setUsers] = useLocalStorage("users", null);
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <AuthContext.Provider value={{token, setToken}}>
      <UserContext.Provider value={{users, setUsers}}>
        <TodoContext.Provider value={{todos, setTodos}}>
          <BrowserRouter>
            <CustomNavbar/>
            <Routes>
              <Route path='/'element={<Welcome/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='signup' element={<SignUp/>}/>
                <Route path='plan' element={
                  <RequireAuth>
                    <Home/>
                  </RequireAuth>
                  }
                />
                <Route path='add'
                 element={
                    <RequireAuth>
                      <AddTodo/>
                    </RequireAuth>
                  }
                />
                <Route path="todo/:id" 
                  element={
                    <RequireAuth>
                      <EditTodo/>
                    </RequireAuth>
                    }
                />
              <Route path='bmi' 
                element={
                  <RequireAuth>
                    <BMICalculator/>
                  </RequireAuth>}
              />
            </Routes>
          </BrowserRouter>
        </TodoContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}


