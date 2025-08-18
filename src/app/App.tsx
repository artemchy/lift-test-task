import { Quiz } from '@/features/quiz/ui';
import './App.scss';
import { MainLayout } from './layout/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <MainLayout>
            <BrowserRouter>
                <Quiz />
                <Routes>
                    <Route path="/geographic-restriction" element={<div>We couldn’t detect your country.</div>} />
                </Routes>
            </BrowserRouter>
        </MainLayout>
    );
}

export default App;
