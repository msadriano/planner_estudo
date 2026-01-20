import { verify, sign, SignOptions } from 'jsonwebtoken';
import { env } from '@/config/env';
import { authConfig } from '@/config/auth-config';

export function generateToken(userId: string) {
  const expiresIn = authConfig.jwt.expiresIn as SignOptions['expiresIn'];
  return sign({}, env.JWT_SECRET, { subject: userId, expiresIn });
}

export function compareToken(token: string) {
    try {
        return verify(token, env.JWT_SECRET)
    } catch {
        return null
    }
}
