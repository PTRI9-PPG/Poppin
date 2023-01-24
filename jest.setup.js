import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { server } from './client/mocks/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

// close 'server' after test is run
afterAll(() => server.close());
