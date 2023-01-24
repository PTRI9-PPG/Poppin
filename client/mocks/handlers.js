import { rest } from 'msw';

export const handlers = [
  rest.post('/users/login', async (req, res, ctx) => {
    const { username } = await req.json();
    sessionStorage.setItem('username', 'testuser');
    if (username !== 'testuser') {
      return res(ctx.json({ message: 'invalid user' }));
    }
    return res(ctx.json({ status: true }));
  }),
];
