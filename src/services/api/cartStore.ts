import mock from '../mockConfig';
import { items } from '../../@fake-db/items';
import { BASE_URL } from '../../config';

mock.onGet(`${BASE_URL}api/items`).reply(() => {
    return [200, items]
});
