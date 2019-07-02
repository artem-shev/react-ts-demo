import { makeApiActions } from './actionCreators';

describe('makeApiActions', () => {
  const processDescriptor = 'API_TEST';
  const baseAction = 'TEST';
  const meta = { type: 'meta' };
  let thunk: any;
  let dispatch: any;
  let transformRequest: any;
  let transformResponse: any;
  let httpService: any;

  beforeEach(() => {
    dispatch = jest.fn();
    transformRequest = jest.fn(() => ({ type: 'transformRequestResult' }));
    transformResponse = jest.fn(() => ({ type: 'transformResponseResult' }));
    httpService = jest.fn(() => ({ type: 'httpServiceResult' }));

    thunk = makeApiActions({
      processDescriptor,
      baseAction,
      httpService,
      transformRequest,
      transformResponse,
      meta,
    });
  });

  it('should dispatch proper actions', async () => {
    await thunk()(dispatch);

    expect(dispatch).toBeCalledTimes(4);
  });

  {
    const types = [
      `START_${processDescriptor}`,
      `STOP_${processDescriptor}`,
      baseAction,
      `${baseAction}_SUCCESS`,
    ];

    types.forEach(type => {
      it(`should dispatch action with type ${type}`, async () => {
        await thunk()(dispatch);
        const calledActions = dispatch.mock.calls.map(([action]: any) => action.type);
        expect(calledActions.includes(type)).toBe(true);
      });
    });
  }

  it('should call transform response with proper arguments', async () => {
    const payload = {};

    await thunk(payload)(dispatch);

    expect(transformRequest).toBeCalledWith(payload, meta);
  });
});
