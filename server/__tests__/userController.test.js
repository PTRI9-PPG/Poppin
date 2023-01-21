const { registerUser, loginUser } = require('../controllers/userController');
const User = require('../models/UserModel');

//instead of actually querying database, mock the values
jest.mock('../models/UserModel');

test('return true', () => {
  expect(true).toBe(true);
});

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

  it('should send status code of 400 if email or password is not entered', async () => {
    const badRequest = { body: {} };
    await registerUser(badRequest, response, next);
  });

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

  it('should respond with 200 if user is created', async () => {
    await registerUser(request, response, next);
    // sequelize returns null if cannot find in db
    User.findOne.mockImplementationOnce(() => null);
  });
});

describe('login function', () => {
  it('should send status code of 400 if email or password is not entered', () => {});
});
