import { IPasswordHasher } from "@domain/password-hasher";

export class PasswordHasherInMemory implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return password + '_hashed';
  }

  async verify(hash: string, password: string): Promise<boolean> {
    return hash === password + '_hashed';
  }
}
