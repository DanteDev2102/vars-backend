import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2');

export async function generateJWT(data) {
  return await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyJWT(token) {
  return await jwtVerify(token, secret);
}
