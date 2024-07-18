import { MailtrapEmailProvider } from "../../providers/implementations/MailtrapEmailProvider";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService";

const emailProvider = new MailtrapEmailProvider()
const userRepository = new UserRepository()

const createUserService = new CreateUserService(userRepository, emailProvider)
const createUserController = new CreateUserController(createUserService)

export { 
  createUserController, 
  createUserService
}