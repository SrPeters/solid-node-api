import { User } from "../../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  private readonly users: User[] = []

  constructor() {}
  
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email) ?? null
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}