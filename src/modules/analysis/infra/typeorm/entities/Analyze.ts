import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

import Document from './Document';

@Entity('analysis')
class Analyze {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  // Análise 1:N Documentos
  // Cascade cria as instâncias de 'Document' sem a necessidade do repositório
  @OneToMany(() => Document, document => document.analyze, { cascade: true })
  documents: Document[];

  @CreateDateColumn()
  analyzed_at: Date;
}

export default Analyze;
