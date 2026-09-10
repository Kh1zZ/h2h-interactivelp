import { QuizQuestion } from '@/types';

/**
 * 20 Relevant, straightforward quiz questions based directly on the website content:
 * - Group overview & SM Entertainment
 * - Members & Leader & Maknae
 * - Countries & Member Symbols
 * - Discography releases & Kia Collaboration Single
 * - Aesthetic Lore & Fandom
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How many members are in Hearts2Hearts?',
    options: ['6 Members', '7 Members', '8 Members', '9 Members'],
    correctIndex: 2,
    hint: 'Eight cheerful voices, one sweet harmony!',
  },
  {
    id: 2,
    question: 'What is the official debut date of Hearts2Hearts?',
    options: ['14 February 2025', '24 February 2025', '1 March 2025', '24 March 2025'],
    correctIndex: 1,
    hint: 'Late February 2025, bringing fresh spring daylight!',
  },
  {
    id: 3,
    question: 'Which pioneering entertainment agency founded Hearts2Hearts?',
    options: ['JYP Entertainment', 'HYBE Labels', 'SM Entertainment', 'YG Entertainment'],
    correctIndex: 2,
    hint: 'Historic K-pop agency behind trailblazers from S.E.S. to aespa.',
  },
  {
    id: 4,
    question: 'What is the official fandom name of Hearts2Hearts?',
    options: ['S2U (Hearts to You)', 'Heartbeats', 'TwoHearts', 'StarHearts'],
    correctIndex: 0,
    hint: 'S, 2, and U — reflecting a two-way heart connection!',
  },
  {
    id: 5,
    question: 'What was Hearts2Hearts’ debut single album released in February 2025?',
    options: ['STYLE', 'The Chase', 'FOCUS', 'RUDE!'],
    correctIndex: 1,
    hint: 'Symbolizes the courage to pursue authentic dreams fearlessly.',
  },
  {
    id: 6,
    question: 'Which B-side track accompanied "The Chase" on their debut single album?',
    options: ['Butterflies', 'Lemon Tang', 'MOONRIDE', 'Iconic Heart'],
    correctIndex: 0,
    hint: 'Fluttering wings celebrating the excitement of fresh starts.',
  },
  {
    id: 7,
    question: 'Who is the dependable leader of Hearts2Hearts?',
    options: ['Carmen', 'Yuha', 'Stella', 'Jiwoo'],
    correctIndex: 3,
    hint: 'Represented by the gentle bunny symbol 🐰.',
  },
  {
    id: 8,
    question: 'Who is the maknae (youngest member) of Hearts2Hearts?',
    options: ['Ye-on', 'Ian', 'A-na', 'Juun'],
    correctIndex: 0,
    hint: 'Born in late December 2008, holding the swan symbol 🦢.',
  },
  {
    id: 9,
    question: 'Which country is member Carmen from?',
    options: ['South Korea', 'Indonesia', 'Canada', 'Japan'],
    correctIndex: 1,
    hint: 'Hailing from Jakarta, Indonesia!',
  },
  {
    id: 10,
    question: 'Which country is member Stella from?',
    options: ['Canada', 'Australia', 'United States', 'New Zealand'],
    correctIndex: 0,
    hint: 'Bringing warm international flair from Toronto, Canada.',
  },
  {
    id: 11,
    question: 'What animal emoji represents Jiwoo in her member profile?',
    options: ['🐱 Cat', '🐰 Bunny', '🐻 Bear', '🦊 Fox'],
    correctIndex: 1,
    hint: 'Gentle, warm, and cute leader!',
  },
  {
    id: 12,
    question: 'What animal emoji represents Carmen in her member profile?',
    options: ['🦊 Fox', '🐰 Bunny', '🐱 Cat', '🦢 Swan'],
    correctIndex: 2,
    hint: 'Chic, playful, and charming feline energy!',
  },
  {
    id: 13,
    question: 'What animal emoji represents Yuha in her member profile?',
    options: ['🐻 Bear', '🐱 Cat', '🐰 Bunny', '🦊 Fox'],
    correctIndex: 0,
    hint: 'Warm, huggable, and full of dancer energy!',
  },
  {
    id: 14,
    question: 'What animal emoji represents A-na in her member profile?',
    options: ['🐱 Cat', '🦊 Fox', '🐻 Bear', '🦢 Swan'],
    correctIndex: 1,
    hint: 'Quick-witted, clever, and charismatic stage presence!',
  },
  {
    id: 15,
    question: 'What is the title of Hearts2Hearts’ special collaboration single with Kia Korea?',
    options: ['STARLIGHT', 'SUNSHINE', 'MOONRIDE', 'NIGHTGLOW'],
    correctIndex: 2,
    hint: 'An electropop night-drive anthem celebrating the Kia RV Black Edition.',
  },
  {
    id: 16,
    question: 'What core aesthetic concept defines Chapter 04 of Hearts2Hearts’ universe?',
    options: ['Cyberpunk Dystopia', 'Daylight Pastel', 'Gothic Fantasy', 'Vintage 80s Disco'],
    correctIndex: 1,
    hint: 'Bright sunlit skies, airy clouds, and warm cheerful tones.',
  },
  {
    id: 17,
    question: 'What was the title of Hearts2Hearts’ second digital single released in April 2025?',
    options: ['STYLE', 'RUDE!', 'Lemon Tang', 'FOCUS'],
    correctIndex: 0,
    hint: 'A chic, confidence-boosting anthem about owning your personal style.',
  },
  {
    id: 18,
    question: 'Which single marks Hearts2Hearts’ energetic Japan debut?',
    options: ['Tokyo Beat', 'Iconic Heart', 'Cherry Blossom', 'Pure Shine'],
    correctIndex: 1,
    hint: 'Released in January 2026 as their Japan Debut Single Album.',
  },
  {
    id: 19,
    question: 'Which bold dance-pop track with an exclamation point dropped in July 2025?',
    options: ['POP!', 'RUDE!', 'HEY!', 'JUMP!'],
    correctIndex: 1,
    hint: 'A punchy, dynamic summer dance-pop sensation.',
  },
  {
    id: 20,
    question: 'Which refreshing summer track brought sweet citrus vibes in August 2025?',
    options: ['Orange Glow', 'Lemon Tang', 'Berry Sweet', 'Lime Soda'],
    correctIndex: 1,
    hint: 'A vibrant, tangy pop confection perfect for sunny days!',
  },
];
