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

  @Column()
  status: string;

  @Column()
  link: string;

  //--------------------
  @Column()
  analyze_id: string;

  // Muitos documentos para uma análise
  @ManyToOne(() => Analyze)
  @JoinColumn({ name: 'analyze_id' })
  analyze: Analyze;
  //--------------------
}

export default Analyze;
