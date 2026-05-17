export type QuizStepId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5';
export type YesNoAnswer = 'yes' | 'no';
export type YesNoAnswerType = YesNoAnswer | null;

export interface IQuizButton {
    value: YesNoAnswer;
    label: string;
    next: QuizStepId;
}

export interface IQuizImage {
    url: string;
    alt: string;
}

export interface IQuizStep {
    id: QuizStepId;
    title: string;
    image?: IQuizImage | null;
    buttons?: readonly IQuizButton[] | null;
    progress: number;
}
export interface IStoredQuizStep {
    stepId: QuizStepId;
    answer: string | null;
    title: string;
    timestamp: number;
    imageSrc?: string;
}

export interface IQuizState {
    currentStepId: QuizStepId;
    key: string | null;
    selected: YesNoAnswerType;
    isClicked: boolean;
}

export interface BaseStepProps {
    title: string;
    image?: IQuizImage | null;
}

export interface StepWithButtonsProps extends BaseStepProps {
    buttons: readonly IQuizButton[];
    selected: YesNoAnswerType;
    onClick: (btn: IQuizButton) => void;
}

export type AnswerStepProps = StepWithButtonsProps;

export interface ThirdStepProps {
    onFileSelect: (file: File, setLoading: (value: boolean) => void) => void;
}

export interface FinalStepProps extends BaseStepProps {
    imageUrl: string | null;
}
