import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleCreateDto } from 'src/dto/role-create.dto';
import { UserCreateDto } from 'src/dto/user-create.dto';
import { Role } from 'src/entity/role.entity';
import { Users } from 'src/entity/users.entity';

import { RoleRepository, UserRepository } from './user.reponsitory';

// export type User = any;

@Injectable()
export class UsersService {
 constructor(private readonly user :UserRepository,private readonly roles : RoleRepository){}

    // private readonly users = [
    //     {
    //         userId: 1,
    //         username: 'john',
    //         password: 'changeme',
    //         role : 1
    //     },
    //     {
    //         userId: 2,
    //         username: 'maria',
    //         password: 'guess',
    //         role : 2
    //     },
    // ];

    async findOne(username: string): Promise<any | undefined> {
     try{
        const fine =  await this.user.findOne({ where: {username: username } });
       if(!fine) throw new Error('Not have user')
       console.log("fine :",fine)
       return fine
     }
      catch(error){
        throw new BadRequestException({
            success: false,
            message: error.message,
        }); 
      }
        
       
    }


    async addRole(body :RoleCreateDto): Promise<any>{
        try{
            if (!body) throw new Error('No data')
            const role = new Role()
            const { name } = body;
            const findrole = await this.roles.findOne({where:{name :name}})
            if(findrole) throw new Error('มีชื่อซ้ำ');
            role.name = name
            await role.save();
            return {
                success: true,
                message: 'add success.',

            };
        }
        catch(error){
            throw new BadRequestException({
                success: false,
                message: error.message,
            }); 
        }
    }
    async addUser(body: UserCreateDto): Promise<any> {
        try {
            if (!body) throw new Error('No data');
           
                const user = new Users()
                const { username,password } = body;
                console.log(body)
                const finduser = await this.user.findOne({ where: { username: username } })
                if (finduser) throw new Error('มีชื่อซ้ำ');
                user.username = username
                user.password = password
                const findro = await this.roles.findOne({where:{id_role: 2}})
                console.log("fine role :",findro)
                user.roleid = findro

                await user.save();
            
            return {
                success: true,
                message: 'add success.',

            };

        } catch (error) {

            throw new BadRequestException({
                success: false,
                message: error.message,
            });

        }
    }

}