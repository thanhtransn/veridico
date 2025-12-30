import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {FindOptionsWhere, QueryDeepPartialEntity, Repository } from 'typeorm'
import { ROLE, User } from '~/entities'
import { UserExistedException, UserNotFoundException } from '~/exceptions'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) { }

  async create(newUser: Omit<User, 'id' | 'organisation'>) {

    await this.checkUserExisted(newUser.email)
    const createdUser = this.user.create(newUser)
    await this.user.save(createdUser)
    return createdUser
  }

  async findValidUserToAdminstratorList() {
    return await this.user
      .find({
        where: { isActive: true, role: ROLE.USER },
        select: ['id', 'firstName', 'lastName', 'mobileNumber', 'isActive']
      })
      .then(v => {
        if (!v) throw new UserNotFoundException()
        return v
      })
  }

  async findByEmail(email: string) {
    return await this.user
      .findOneBy({ email: email, isActive: true })
      .then(v => {
        if (!v) throw new UserNotFoundException()
        return v
      })
  }

  async findById(id: string) {
    return await this.user
      .findOne({
        where: { id: id, isActive: true },
        select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'role', 'isActive'],
        relations: ['organisation']
      })
      .then(v => {
        if (!v) throw new UserNotFoundException()
        return v
      })
  }

  async findByConditions(conditions: FindOptionsWhere<User>) {
    return await this.user
      .findBy({
        ...conditions,
      })
      .then(v => {
        if (!v) throw new UserNotFoundException()
        return v
      })
  }

  async checkUserExisted(email: string): Promise<boolean> {
    return await this.user
      .findOneBy({ email: email, isActive: true })
      .then(v => {
        if (v) throw new UserExistedException()
        return true
      })
  }

  async update(update: QueryDeepPartialEntity<User>, user: User) {
    return await this.user.update({ email: user.email }, { ...update }).catch(() => {
      throw new BadRequestException()
    })
  }
}
