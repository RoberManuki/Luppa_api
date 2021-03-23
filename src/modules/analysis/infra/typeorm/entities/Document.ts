import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Analyze from './Analyze';

@Entity('documents')
class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  link: string;

  //---------------------------------
  @Column()
  analyze_id: string;

  // Documentos N:1 Análise
  @ManyToOne(() => Analyze)
  @JoinColumn({ name: 'analyze_id' })
  analyze: Analyze;
  //---------------------------------
}

export default Document;
