import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw { status: 400, message: "User not found" };
    }
    if (!user.admin) {
      throw { status: 400, message: "User does not admin" };
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
