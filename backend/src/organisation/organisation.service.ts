import { Injectable } from '@nestjs/common'
import { AdministratorListNotAllowedException, OrganistionAlreadyExistedException, OrganistionNotFoundException } from '~/exceptions'
import { UserService } from '~/user/user.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Organisation, ROLE, User } from '~/entities'
import { DataSource, In, Repository } from 'typeorm'
import { PaginationQueryDto } from '~/utils/pagination.dto'
import { NewOrganisation } from './dto/new-organisation.dto'
import { UpdateOrganization } from './dto/update-organisation.dto'

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisation: Repository<Organisation>,
    private readonly db: DataSource,
    private readonly userService: UserService
  ) { }

  async checkExistedOrganisation(uen: string) {
    return await this.organisation
      .findOneBy({ uen: uen })
      .then(v => {
        if (v) throw new OrganistionAlreadyExistedException()
        return true
      })
  }

  async findById(
    id: number,
    relations?: string[]
  ) {
    return await this.organisation.findOne({
      where: { id: id },
      select: {
        administrators: {
          id: true,
          firstName: true,
          lastName: true,
          mobileNumber: true,
          role: true
        }
      },
      relations,
    }).then(v => {
      if (!v) throw new OrganistionNotFoundException()
      return v
    })
  }

  async findAll(
    pagination: PaginationQueryDto,
  ) {
    return await this.organisation.find({
      where: {
        isActive: true
      },
      select: {
        administrators: {
          id: true,
          firstName: true,
          lastName: true,
          mobileNumber: true,
          role: true
        }
      },
      relations: ['administrators']
    }).then(v => {
      if (!v) throw new OrganistionNotFoundException()
      return v
    })
  }

  async findOneOrganisation(id: number) {
    return await this.organisation
      .findOne({
        where: { id: id },
        select: {
          administrators: {
            id: true,
            firstName: true,
            lastName: true,
            mobileNumber: true,
            role: true
          }
        },
        relations: ['administrators']
      })
      .then(v => {
        if (!v) throw new OrganistionNotFoundException()
        return v
      })
  }

  async createOrganization(newOrganisation: NewOrganisation, user: User) {
    await this.checkExistedOrganisation(newOrganisation.uen)

    let organisationInfo = {
      companyName: newOrganisation.companyName,
      uen: newOrganisation.uen,
      registeredAddress: newOrganisation.registeredAddress,
      businessType: newOrganisation.businessType,
      dateOfincorporation: newOrganisation.dateOfincorporation,
      natrueOfBusiness: newOrganisation.natrueOfBusiness,
      StatusOfCompany: newOrganisation.StatusOfCompany,
      companySize: newOrganisation.companySize,
      paidUpCapital: newOrganisation.paidUpCapital,
      administrators: newOrganisation.administrators,
      createdBy: user
    } as unknown as Organisation

    let users = await this.userService.findByConditions({ id: In(newOrganisation.administrators), role: ROLE.USER })
    if (users.length !== newOrganisation.administrators.length) {
      throw new AdministratorListNotAllowedException()
    }
    let newOrg = this.organisation.create(organisationInfo);
    newOrg.administrators = users
    await this.db.manager.transaction(async (transactionalEntityManager) => {
      const org = await transactionalEntityManager.save(newOrg)
      users = users.filter((e: User) => {
        e.organisation = org
        e.role = ROLE.ADMiNSTRATOR
        return e
      })

      await transactionalEntityManager.save(users)
    })

    return {
      status: 'success'
    }

  }

  async updateOrganisation(update: UpdateOrganization, organisationId: number) {
    let org = await this.findById(organisationId, ['administrators'])

    let { administrators, ...updateOrg } = update
    const newAdministrators = administrators?.filter((id: string) => !org.administrators.map(e => e.id).includes(id))
    const deactiveAdmin = org.administrators.filter((u: User) => !administrators?.includes(u.id)).filter((u: User) => {
      u.organisation = null as unknown as Organisation
      u.role = ROLE.USER
      return u
    })

    if (newAdministrators?.length) {

      const users = await this.userService.findByConditions({ id: In(newAdministrators), role: ROLE.USER })
      if (users.length !== newAdministrators.length) {
        throw new AdministratorListNotAllowedException()
      }
    }

    await this.db.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(
        Organisation,
        { id: organisationId },
        updateOrg
      );
      if (deactiveAdmin.length) {
        await transactionalEntityManager.save(deactiveAdmin)
      }
      if (newAdministrators?.length) {
        if (newAdministrators.length > 0) {
          await transactionalEntityManager.update(
            User,
            {
              id: In(newAdministrators),
              role: ROLE.USER,
            },
            {
              role: ROLE.ADMiNSTRATOR,
              organisation: { id: organisationId },
            }
          );
        }
      }
    })

    return {
      status: 'success'
    }
  }
}
