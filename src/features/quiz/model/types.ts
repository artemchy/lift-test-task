export type YesNoAnswerType = 'yes' | 'no' | null;

export interface IQuizButton {
    value: string;
    label: string;
    next: string;
}

export interface IQuizImage {
    url: string;
    alt: string;
}

export interface IQuizStep {
    id: string;
    title: string;
    image?: IQuizImage | null;
    buttons?: IQuizButton[] | null;
    progress: number;
}

export interface IQuizState {
    currentStepId: string;
    key: string | null;
    selected: YesNoAnswerType;
    isClicked: boolean;
}

export interface BaseStepProps {
    title: string | null;
    image?: IQuizImage | null;
}

export interface StepWithButtonsProps extends BaseStepProps {
    buttons: IQuizButton[];
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
