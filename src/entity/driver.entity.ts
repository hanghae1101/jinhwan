import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './base.entity';

export enum driverStatus {
  WAITING = 'waiting',
  DRIVING = 'driving',
}

@Entity()
export class Driver extends BasicEntity {
  @Column()
  vehicle: string;

  @Column({
    type: 'enum',
    enum: driverStatus,
    default: driverStatus.WAITING,
  })
  status: string;
}
