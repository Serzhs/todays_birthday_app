import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { store } from '../store/store.ts';
import { http, HttpResponse, JsonBodyType } from 'msw';

export const server = setupServer();

beforeAll(() => server.listen());
beforeEach(() => {
  server.restoreHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

export const renderWithProvider = (component: ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

export const mockGetResponse = (url: string, response: JsonBodyType) => {
  server.use(http.get(url, () => HttpResponse.json(response)));
};

export const mockGetErrorResponse = (url: string, response?: JsonBodyType) => {
  server.use(http.get(url, () => HttpResponse.json(response, { status: 404 })));
};
