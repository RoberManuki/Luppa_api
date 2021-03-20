import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('documents')
class Analyze {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'error' })
  status: 'fraud' | 'valid' | 'error';

  @Column()
  link: string;

  //--------------------
  @Column()
  analyze_id: string;

  @ManyToOne(() => Analyze)
  @JoinColumn({ name: 'analyze_id' })
  analyze: Analyze;
  //--------------------
}

export default Analyze;
