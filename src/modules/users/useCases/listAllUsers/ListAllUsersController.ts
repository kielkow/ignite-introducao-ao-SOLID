import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      if (!user_id) throw { status: 400, message: "User ID must be informed" };

      const users = this.listAllUsersUseCase.execute({
        user_id: user_id.toString(),
      });

      return response.json(users);
    } catch (error) {
      return response.status(error.status).json({
        error: true,
        message: error.message,
      });
    }
  }
}

export { ListAllUsersController };
