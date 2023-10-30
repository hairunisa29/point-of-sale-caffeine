import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/order" />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
