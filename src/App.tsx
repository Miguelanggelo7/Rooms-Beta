import './App.scss';
import Welcome from './pages/Welcome';
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import UnAuth from "./components/UnAuth";
import { UserProvider } from "./hooks/useUser";
import { signOut } from "./api/auth";

const App = (): JSX.Element => {

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="welcome" replace />} />
        <Route
          element={
            <UnAuth>
              <Outlet/>
            </UnAuth>
          }
        >
          <Route path="welcome" element={<Welcome />} />
        </Route>
        <Route
            element={
              <Auth>
                <Outlet/>
              </Auth>
            }
          >
            <Route path="home" element={<button onClick={signOut}>salir</button>} />
          </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
