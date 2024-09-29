import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TokenModule } from '../src/common/token/token.module';
import { TokenService } from '../src/common/token/token.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let tokenService: TokenService;

  jest.setTimeout(30000);

  const testUser = {
    email: 'daniilfrei@gmail.com',
    password: 'Abc12345678',
    name: 'Daniil',
    secondName: 'Frei',
    birthDate: new Date().toISOString(),
  };

  let accessToken: string = undefined;
  let userIdFromAccessToken: string = undefined;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    tokenService = app.select(TokenModule).get(TokenService);
  });

  it('sign-up User with all possible fields - should return accessToken', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect(201);

    accessToken = response.body.accessToken;

    expect(accessToken).toBeDefined();
    expect(accessToken.length).toBeGreaterThanOrEqual(192);

    return response;
  });

  it('Parse JWT and get userId from payload - userId should exist in JWT payload', async () => {
    const { userId } = await tokenService.decode(accessToken);

    expect(userId).toBeDefined();
    expect(userId.length).toBe(36);

    userIdFromAccessToken = userId;
    return userId;
  });

  it('User Get:id - should return almost all fields except password', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/user/${userIdFromAccessToken}`)
      .set('Authorization', `${accessToken}`)
      .expect(200);

    expect(body.id).toBe(userIdFromAccessToken);
    expect(body.email).toBe(testUser.email);
    expect(body.name).toBe(testUser.name);
    expect(body.secondName).toBe(testUser.secondName);
    expect(body.birthDate).toBeDefined();
    expect(body.name).toBeDefined();
    expect(body.name).toBeDefined();

    return body;
  });

  it('Send password to Patch:id - should return 400 Error', async () => {
    const { body } = await request(app.getHttpServer())
      .patch(`/user/${userIdFromAccessToken}`)
      .send({ email: testUser.email, password: testUser.password + 1 })
      .set('Authorization', `${accessToken}`)
      .expect(400);
    expect({
      message: ['property password should not exist'],
      error: 'Bad Request',
      statusCode: 400,
    });

    return body;
  });

  it('Send Patch:id - should return updated info', async () => {
    testUser.name = 'TEST' + testUser.name;
    testUser.email = 'TEST' + testUser.email;
    testUser.secondName = 'TEST' + testUser.secondName;
    testUser.birthDate = new Date('2012-12-12T12:12:12.120Z').toISOString();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...dtoToPatch } = testUser;
    const { body } = await request(app.getHttpServer())
      .patch(`/user/${userIdFromAccessToken}`)
      .send(dtoToPatch)
      .set('Authorization', `${accessToken}`)
      .expect(200);

    expect(body.id).toBe(userIdFromAccessToken);
    expect(body.email).toBe(testUser.email);
    expect(body.name).toBe(testUser.name);
    expect(body.secondName).toBe(testUser.secondName);
    expect(body.birthDate).toBeDefined();
    expect(body.name).toBeDefined();
    expect(body.name).toBeDefined();

    return body;
  });

  it('Delete:id - should return success: true', async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/user/${userIdFromAccessToken}`)
      .set('Authorization', `${accessToken}`)
      .expect(200);

    expect(body.success).toBeTruthy();

    return body;
  });

  it('Delete:id already deleted user - should success: false', async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/user/${userIdFromAccessToken}`)
      .set('Authorization', `${accessToken}`)
      .expect(200);

    expect(body.success).toBeFalsy();

    return body;
  });

  it('User Get:id non existing user- should return almost all fields except password', () => {
    return request(app.getHttpServer())
      .get(`/user/${userIdFromAccessToken}`)
      .set('Authorization', `${accessToken}`)
      .expect(404);
  });
});
