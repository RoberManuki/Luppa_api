import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity('analysis')
class Analyze {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @CreateDateColumn()
  analyzed_at: Date;
}

export default Analyze;
