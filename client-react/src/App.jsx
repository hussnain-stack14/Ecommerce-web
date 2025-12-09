import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
    return (
        <>
            <Header />
            <main style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* Add other routes here as you migrate them */}
                    {/* <Route path="/login" element={<LoginPage />} /> */}
                    {/* <Route path="/register" element={<RegisterPage />} /> */}
                    {/* <Route path="/products" element={<ProductsPage />} /> */}
                    {/* <Route path="/cart" element={<CartPage />} /> */}
                </Routes>
            </main>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
