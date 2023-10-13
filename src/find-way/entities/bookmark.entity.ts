import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Double,
} from 'typeorm';
// import { User } from './User';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placeName: string;

  @Column()
  address: string;

  @Column()
  road_address: string;

  @Column()
  x: string;

  @Column()
  y: string;

  //유저 엔티티랑 조인할 때 주석 해제하기
  //   @ManyToOne(() => User, (user) => user.placeBookmark)
  //   user: User;
}
