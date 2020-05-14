import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Timestamp, ManyToOne, JoinColumn, BaseEntity} from "typeorm";
import Bot from "./Bot";

@Entity()
export default class Comando {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    grupo: string;

    @Column()
    ordem: number;

    @Column()
    comando: string;

    @Column()
    acao: string;

    @ManyToOne(() => Bot)
    @JoinColumn({name: 'bot_id'})
    bot: string;

    @Column()
    @UpdateDateColumn()
    update_at: Timestamp

    @Column()
    @CreateDateColumn()
    created_at: Timestamp

}
