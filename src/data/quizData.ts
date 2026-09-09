import { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How many members form the shining world of Hearts2Hearts?',
    options: ['6 Members', '7 Members', '8 Members', '9 Members'],
    correctIndex: 2,
    hint: 'Hint: Scene 2 is named "Eight Hearts"!',
  },
  {
    id: 2,
    question: 'What is the title of Hearts2Hearts’ debut single album released on 24 February 2025?',
    options: ['Butterflies', 'The Chase', 'STYLE', 'Lemon Tang'],
    correctIndex: 1,
    hint: 'Hint: It features the title track and "Butterflies"!',
  },
  {
    id: 3,
    question: 'Which entertainment agency debuted Hearts2Hearts?',
    options: ['SM Entertainment', 'JYP Entertainment', 'YG Entertainment', 'HYBE'],
    correctIndex: 0,
    hint: 'Hint: One of Korea’s pioneering entertainment powerhouses!',
  },
  {
    id: 4,
    question: 'What is the official fandom name of Hearts2Hearts?',
    options: ['HeartsClub', 'S2U', 'Heartbeats', 'TwoHearts'],
    correctIndex: 1,
    hint: 'Hint: Formed with S, 2, and U (representing Hearts to You)!',
  },
];
