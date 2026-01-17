import { IPasswordHasher } from "src/domain/password-hasher";
import argon2 from 'argon2';

export class Argon2Hasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password);
  }
  async verify(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}