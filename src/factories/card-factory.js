import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount, randomInteger } from '../utils';

Factory.define('card')
  .sequence('id')
  .attrs({
    title: () => faker.lorem.words(2),
    text: () => faker.lorem.words(10),
  })
  .attr('userId', ['userId'], function(users) {
    return randomInteger(users[0].id, users[users.length - 1].id);
  })
  .attr('listId', ['listId'], function(lists) {
    return randomInteger(lists[0].id, lists[lists.length - 1].id);
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('card', params));
