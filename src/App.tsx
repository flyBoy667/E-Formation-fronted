import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./Pages";
import FormationDetail from "./Pages/FormationDetail";
import FormationUser from "./Pages/FormationUser";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/formation/:id" element={<FormationDetail />} />
        <Route path="/formation/user/:id" element={<FormationUser />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
