import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

// import Document from './Document';

@Entity('analysis')
class Analyze {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @Column()
  documents: string;
  // documents: Document[];

  @CreateDateColumn()
  analyzed_at: Date;
}

export default Analyze;
