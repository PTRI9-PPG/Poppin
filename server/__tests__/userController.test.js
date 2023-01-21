const { registerUser, loginUser } = require('../controllers/userController');
const User = require('../models/UserModel');

test('return true', () => {
  expect(true).toBe(true);
});

jest.mock('../models/UserModel');

describe('register function', () => {
  const request = {
    body: {
      email: 'fakeEmail',
      password: 'fakePassword',
    },
  };

  const response = {
    status: jest.fn((x) => x),
  };

  const next = jest.fn();

  it('should send status code of 400 if email or password is not entered', async () => {});

  it('should send status code of 400 if user already exists', async () => {
    //mockImplementationOnce: mocking .findOne Method to return an object, as if findOne actually found another user in the database
    User.findOne.mockImplementationOnce(() => ({
      id: 1,
      email: 'e',
      password: 'p',
    }));
    await registerUser(request, response, next);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(next).toHaveBeenCalledWith(new Error('user already exists'));
  });

  it('blah', () => {});
});

describe('login function', () => {
  it('should send status code of 400 if email or password is not entered', () => {});
});
