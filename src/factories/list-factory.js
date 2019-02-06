import { Factory } from 'rosie';
import faker from 'faker';
import { mapCount } from '../utils';

Factory.define('list')
  .sequence('id')
  .attrs({
    title: () => faker.lorem.words(3),
  });

export default (count = 10, params = {}) => mapCount(count, () => Factory.build('list', params));
