import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, OneToMany, BaseEntity} from "typeorm";

@Entity()
export default class Bot{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 100})
    nome: string;

    @Column({length: 255})
    descricao: string;

    @Column({length: 255})
    comando: string;

    @Column()
    ativo: boolean;

    @Column()
    legenda: string;

    @Column()
    @UpdateDateColumn()
    update_at: Timestamp

    @Column()
    @CreateDateColumn()
    created_at: Timestamp
}
