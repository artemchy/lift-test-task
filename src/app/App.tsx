import { Quiz } from '@/features/quiz/ui';
import './App.scss';
import { MainLayout } from './layout/Main';

function App() {
    return (
        <MainLayout>
            <Quiz />
        </MainLayout>
    );
}

export default App;
