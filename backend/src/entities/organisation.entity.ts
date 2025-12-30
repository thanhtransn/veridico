import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Organisation {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column({ nullable: false})
    companyName: string

    @Column({ nullable: false, unique: true})
    uen: string

    @Column({ nullable: false})
    registeredAddress: string

    @Column({ nullable: false})
    businessType: string

    @Column({ nullable: false})
    dateOfincorporation: Date

    @Column({ nullable: false})
    natrueOfBusiness: string

    @Column({ nullable: false})
    StatusOfCompany: string

    @Column({nullable: true})
    companySize: number

    @Column({nullable: true})
    paidUpCapital: string

    @Column({default: true})
    isActive: boolean

    @ManyToOne(() => User, (user) => user?.id)
    createdBy: User

    @OneToMany(() => User, (user) => user.organisation)
    administrators: User[]
}