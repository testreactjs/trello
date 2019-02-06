import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount, randomInteger } from '../utils';

Factory.define('comment')
  .sequence('id')
  .attrs({
    text: () => faker.lorem.words(10),
  })
  .attr('userId', ['userId'], function(users) {
    return randomInteger(users[0].id, users[users.length - 1].id);
  })
  .attr('cardId', ['cardId'], function(cards) {
    return randomInteger(cards[0].id, cards[cards.length - 1].id);
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('comment', params));
