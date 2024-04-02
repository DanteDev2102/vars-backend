import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { hash, compare } = require('bcryptjs');

export async function hashString(str) {
  return await hash(str, 10);
}

export async function isGenerateHashWithString(str, hash) {
  return await compare(str, hash);
}
