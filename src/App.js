import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '@/views/pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <ToastContainer position={'bottom-right'} />
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
