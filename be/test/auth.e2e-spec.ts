import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('sign-in with non registered user - should return 401', () => {
    const email = 'daniilfrei@gmail.com';
    const password = 'Abc12345678';

    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ email, password })
      .set('Accept', 'application/json')
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 });
  });

  it('sign-up User with all possible fields - should return accessToken', async () => {
    const email = 'daniilfrei@gmail.com';
    const password = 'Abc12345678';
    const name = 'Daniil';
    const secondName = 'Frei';
    const birthDate = new Date().toISOString();

    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email, password, name, secondName, birthDate })
      .set('Accept', 'application/json')
      .expect(201);

    const { accessToken } = response.body;

    expect(accessToken).toBeDefined();
    expect(accessToken.length).toBeGreaterThanOrEqual(192);

    return response;
  });

  it('sign-up User with already registered email - should return accessToken Conflict', async () => {
    const email = 'daniilfrei@gmail.com';
    const password = 'Abc12345678';
    const name = 'Daniil';
    const secondName = 'Frei';
    const birthDate = new Date().toISOString();

    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email, password, name, secondName, birthDate })
      .set('Accept', 'application/json')
      .expect(409)
      .expect({
        message: 'User with same email already registered',
        error: 'Conflict',
        statusCode: 409,
      });

    const { accessToken } = response.body;

    expect(accessToken).toBeUndefined();

    return response;
  });

  it(
    'sign-up User with password les then ' +
      '8 characters, name as numberString, secondName as empty string, ' +
      'and not existed email - should return 403',
    async () => {
      const password = '123';
      const name = '45213';
      const secondName = '';
      const birthDate = Date();

      // new Date().toISOString();

      const response = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ /*email,*/ password, name, secondName, birthDate })
        .set('Accept', 'application/json')
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'email must be an email',
            'Your password must meet the following criteria:\n    - At least 8 characters long\n    - Contains at least one uppercase letter (A-Z)\n    - Contains at least one lowercase letter (a-z)\n    - Contains at least one digit (0-9)',
            'password should be at least 8 characters',
            'Name must contain only letters and spaces (no numbers or special characters)',
            'Name must contain only letters and spaces (no numbers or special characters)',
            'secondName should not be empty',
            'birthDate must be a valid ISO 8601 date string',
          ],
          error: 'Bad Request',
        });

      const { accessToken } = response.body;

      expect(accessToken).toBeUndefined();

      return response;
    },
  );

  it('sign-in with correct cred - should return accessToken', async () => {
    const email = 'daniilfrei@gmail.com';
    const password = 'Abc12345678';

    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ email, password })
      .set('Accept', 'application/json')
      .expect(201);

    const { accessToken } = response.body;

    expect(accessToken).toBeDefined();
    expect(accessToken.length).toBeGreaterThanOrEqual(192);

    return response;
  });

  it('sign-in with un-correct cred - should return Unauthorized', async () => {
    const email = 'daniilfrei@gmail.com';
    const password = 'Abc12345678000000000';

    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ email, password })
      .set('Accept', 'application/json')
      .expect(401);

    const { accessToken } = response.body;

    expect(accessToken).toBeUndefined();

    return response;
  });
});
