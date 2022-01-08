import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('tb_usuarios')
export class PostgreSQLUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: string

  @Column({ name: 'foto', nullable: true })
  pictureUrl?: string

  @Column({ name: 'iniciais', nullable: true })
  initials?: string
}
