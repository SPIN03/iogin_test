import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
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

    
    @ManyToOne(type => Role, role => role.id_role)
    @JoinColumn({ name: "roleid" })
    roleid: Role;

}

