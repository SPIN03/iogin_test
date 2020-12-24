import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    username: string;

    @Column()
    password: string;


    @OneToOne(type => Role, role => role.id_role)
    roleid: Role;

}

