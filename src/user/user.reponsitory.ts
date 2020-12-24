import { Role } from "src/entity/role.entity";
import { Users } from "src/entity/users.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Users)
export class UserRepository extends Repository<Users> { }

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> { }
