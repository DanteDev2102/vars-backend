import { hash, compare } from 'bcryptjs';

export async function hashString(str) {
  return await hash(str, 10);
}

export async function isGenerateHasWithString(str, hash) {
  return await compare(str, hash);
}
