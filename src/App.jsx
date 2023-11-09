import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/order" />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/history" element={<TransactionHistoryPage />} />
        <Route path="/history/:id" element={<TransactionDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
