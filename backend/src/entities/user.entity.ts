import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organisation } from "./organisation.entity";

export enum ROLE {
  USER =  'User',
  ADMiNSTRATOR = 'Adminstrator',
  SUPERADMIN = 'Superadmin'
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false})
  firstName: string;

  @Column({ nullable: false})
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false})
  password: string;

  @Column({ nullable: false, unique: true})
  mobileNumber: string;

  @Column({ default: ROLE.USER, type: String})
  role: ROLE;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Organisation, org => org.administrators, {
    nullable: true,
  })
  @JoinColumn()
  organisation: Organisation
}

