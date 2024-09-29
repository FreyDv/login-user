import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadJWTInterface } from '../payloadJWT.interface';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async verify(
    jwt: string,
  ): Promise<{ isValid: boolean; payload: PayloadJWTInterface }> {
    const payload = await this.jwtService
      .verifyAsync<PayloadJWTInterface>(jwt)
      .catch((err) => {
        throw new UnauthorizedException(err);
      });

    console.log(payload);
    return { isValid: true, payload: payload };
  }

  async sign(payloadJWTInterface: PayloadJWTInterface): Promise<string> {
    return this.jwtService.signAsync(payloadJWTInterface);
  }

  async decode(jwt: string): Promise<PayloadJWTInterface> {
    return this.jwtService.decode(jwt);
  }
}
