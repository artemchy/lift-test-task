export const saveStepToLocalStorage = (stepId: string, answer: string | null, title: string, imageSrc?: string) => {
    const stored = localStorage.getItem('quizHistory');
    const history = stored ? JSON.parse(stored) : [];

    const newStep = {
        stepId,
        answer,
        title,
        timestamp: Date.now(),
        ...(imageSrc ? { imageSrc } : {}),
    };

    localStorage.setItem('quizHistory', JSON.stringify([...history, newStep]));
};
