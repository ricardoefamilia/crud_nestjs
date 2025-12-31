import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ type: 'varchar', length: 150 })
  de: string;

  @Column({ type: 'varchar', length: 150 })
  para: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date; // creatdedAt para registrar a data de criação do recado
  @CreateDateColumn()
  createdAt?: Date; // creatdedAt para registrar a data de criação do recado

  @UpdateDateColumn()
  updatedAt?: Date; // updatedAt ultima atualização do recado
}
