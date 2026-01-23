import { verify, sign, SignOptions } from 'jsonwebtoken';
import { env } from '@/config/env';
import { authConfig } from '@/config/auth-config';

export function generateToken(userId: string, customExpireIn?: string, type: 'auth' | 'recovery' = 'auth') {
  const expiresIn = (customExpireIn ||  authConfig.jwt.expiresIn) as SignOptions['expiresIn'];
  return sign({type}, env.JWT_SECRET, { subject: userId, expiresIn });
}

export function verifyToken(token: string) {
  try {
    return verify(token, env.JWT_SECRET);
  } catch {
    return null;
  }
}
