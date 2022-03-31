import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Password {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    website: string;

    @Column('text')
    username: string;

    @Column('text')
    password: any;

}
