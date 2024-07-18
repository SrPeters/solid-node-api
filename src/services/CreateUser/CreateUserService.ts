import { User } from "../../entities/User";
import { IEmailProvider } from "../../providers/interfaces/IEmailProvider";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailProvider: IEmailProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExists)
      throw new Error('User already exists.')

    const user = new User(data)
    await this.userRepository.save(user)

    await this.emailProvider.sendEmail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Support Team',
        email: 'support@wechord.com'
      },
      subject: `Welcome ${data.name}!`,
      body: `<p>Your account has been successfully created, and you can now navigate our website!</p>`
    })
  }
}
587348