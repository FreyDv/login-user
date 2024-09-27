import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('GET /ping', () => {
    it('should return "pong"', () => {
      const msg = appController.getHello().split('_')[0];

      expect(msg).toBe('pong');
    });

    it('should return "timestamp"', () => {
      const timeBeforeCall = Date.now();

      const ms = appController.getHello().split('_')[1];

      const timeAfterCall = Date.now();

      expect(timeAfterCall - timeBeforeCall).toBeLessThanOrEqual(15);
      expect(timeBeforeCall <= +ms).toBeTruthy();
      expect(timeAfterCall >= +ms).toBeTruthy();
    });
  });
});
