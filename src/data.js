import { v4 } from 'uuid';

export default [
  {
    id: v4(),
    title: 'TODO',
    cards: [
      {
        id: v4(),
        title: 'Название первой карточки',
        text: 'Текст первой карточки',
        user: 'Юзер1',
        comments: [
          {
            id: v4(),
            user: 'adadad',
            text: 'Its my first comment',
          },
        ],
      },
      {
        id: v4(),
        title: 'Название второй карточки',
        text: 'Текст второй карточки',
        user: 'Egir',
        comments: [
          {
            id: v4(),
            user: 'Ivan',
            text: 'Itlsfklsf sdf ',
          },
          {
            id: v4(),
            user: 'Olga',
            text: 'Olg  dad asa',
          },
        ],
      },
    ],
  },
  {
    id: v4(),
    title: 'In Progress',
    cards: [
      {
        id: v4(),
        title: 'Card 3 title',
        text: 'dadadaadadasdadsdds',
        user: 'sddd',
        comments: [],
      },
      {
        id: v4(),
        title: 'Card 4 title',
        text: 'dadadaadasadsdadasdds',
        user: '233',
        comments: [],
      },
    ],
  },
  {
    id: v4(),
    title: 'Testing',
    cards: [],
  },
  {
    id: v4(),
    title: 'Done',
    cards: [
      {
        id: v4(),
        title: 'Card 6 title',
        text: 'dadadaaaasasddadasdds',
        user: 'Live',
        comments: [],
      },
      {
        id: v4(),
        title: 'Card 7 title',
        text: 'dadadaadaasdasaddasdds',
        user: 'Limon',
        comments: [],
      },
    ],
  },
];
