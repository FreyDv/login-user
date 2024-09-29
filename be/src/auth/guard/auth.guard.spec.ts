import { AuthGuard } from './auth.guard';

import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../../common/token/token.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const mockAuthService = {
      validateToken: jest.fn().mockReturnValue(true), // Mock method for token validation
    };

    // Create the testing module with the mock
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: TokenService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
