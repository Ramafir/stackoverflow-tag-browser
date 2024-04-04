import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '@/views/pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
