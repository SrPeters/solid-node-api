import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    try {
      await this.createUserService.execute({
        email,
        name,
        password
      })

      return response.status(201).send()

    } catch (error) {
      return response.status(400).json({
        message: error.message || 'An unexpected error occourred.'
      })
    }
  }
}