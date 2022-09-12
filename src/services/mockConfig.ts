import MockAdapter from "axios-mock-adapter";
import { axiosApi } from '../api/base';

// This sets the mock adapter on the default instance
export default new MockAdapter(axiosApi, {
  delayResponse: 500,
  onNoMatch: 'passthrough',
});
