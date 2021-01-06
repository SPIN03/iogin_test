import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoleCreateDto } from 'src/dto/role-create.dto';
import { UserCreateDto } from 'src/dto/user-create.dto';
import { Role } from 'src/entity/role.entity';
import { Users } from 'src/entity/users.entity';
import * as bcrypt from 'bcrypt';
import { RoleRepository, UserRepository } from './user.reponsitory';


@Injectable()
export class UsersService {
    
    private saltRounds = 10;
    constructor(private readonly user :UserRepository,private readonly roles : RoleRepository){}

    async getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async getuserall() {
        try {
            const finduser = await this.user.find()

            if (!finduser.length) throw new Error('no data');
            return {
                success: true,
                data: finduser
            }

        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }

   async profile(username:string): Promise<any>{
       console.log('ยูเซอ :',username)
      try{ const fine = await this.user.findOne({where : {username :username}})
    //   const profile = [fine.username,fine.roleid]
      console.log(fine)
        if(!fine) throw new Error ('ไม่มี')
       return fine
    
    } catch(error){
        throw new BadRequestException({
            success: false,
            message: error.message,
        }); 
      }
   }

    async findOne(username: string): Promise<any> {
     try{
        const fine =  await this.user.findOne({ where: {username: username },relations:['roleid'] });
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

    async findrole(name :string) : Promise<object>{
        try{ const fine = await this.roles.findOne({where : {name :name}})
        console.log(fine)
          if(!fine) throw new Error ('ไม่มี Role')
         return fine
      
      } catch(error){
          throw new BadRequestException({
              success: false,
              message: error.message,
          }); 
        }
    }

    async addrole(body :RoleCreateDto): Promise<any>{
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
    async adduser(body: UserCreateDto): Promise<any> {
        try {
            if (!body) throw new Error('No data');
           
                const user = new Users()
                const { username,password } = body;
                console.log(body)
                const finduser = await this.user.findOne({ where: { username: username } })
                if (finduser) throw new Error('มีชื่อซ้ำ');
                user.username = username
                user.password = await this.getHash(password);
                const findro = await this.roles.findOne({where:{id_role: 2}})
                // if(!findro){
                //     const newrole = new Role()
                     //สร้างแอดมินกับยูเซอ
                // }
                console.log("fine role :",findro)
                user.roleid = findro
                console.log("user role :",user.roleid)
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