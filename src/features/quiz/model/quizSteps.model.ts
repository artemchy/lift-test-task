export const quizSteps = [
    {
        id: 'q1',
        title: 'Are you from %country?',
        image: null,
        buttons: [
            { value: 'yes', label: 'Yes, I’m from %country', next: 'q2' },
            { value: 'no', label: 'No, I’m from another country', next: 'q4' },
        ],
        progress: 0,
    },
    {
        id: 'q2',
        title: 'Ready to create your first photo album?',
        image: null,
        buttons: [
            { value: 'yes', label: 'Yes, let’s begin', next: 'q3' },
            { value: 'no', label: 'No, not interested yet', next: 'q4' },
        ],
        progress: 33,
    },
    {
        id: 'q3',
        title: 'Upload an Image',
        buttons: null,
        image: null,
        progress: 66,
    },
    {
        id: 'q4',
        title: 'Well then let’s try next time',
        image: {
            url: '/public/hand.svg',
            alt: 'shaking hand',
        },
        progress: 100,
        buttons: null,
    },
    {
        id: 'q5',
        progress: 100,
        image: {
            url: '/public/party.svg',
            alt: 'selebration',
        },
        title: 'Image uploaded successfully',
        buttons: null,
    },
];
