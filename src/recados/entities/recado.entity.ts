import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date; // creatdedAt para registrar a data de criação do recado

  @CreateDateColumn()
  createdAt?: Date; // creatdedAt para registrar a data de criação do recado

  @UpdateDateColumn()
  updatedAt?: Date; // updatedAt ultima atualização do recado

  // Muitos recados podem ser enviados por uma pessoa (emissor)
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna que referencia a pessoa emissora
  @JoinColumn({ name: 'de' })
  de: Pessoa;

  // Muitos recados podem ser enviados para uma pessoa (destinatária)
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna que referencia a pessoa destinatária
  @JoinColumn({ name: 'para' })
  para: Pessoa;
}
