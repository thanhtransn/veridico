import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { OrganisationService } from './organisation.service'
import { ROLE, User } from '~/entities'
import { NewOrganisation } from './dto/new-organisation.dto'
import { PaginationQueryDto } from '~/utils/pagination.dto'
import { CurrentUser, Pagination, Roles } from '~/utils/decorators'
import { UpdateOrganization } from './dto/update-organisation.dto'

@Injectable()
@Controller('organisation')
export class OrganisationController {
  constructor(
    private readonly organisationService: OrganisationService,
  ) {}

  @Roles(ROLE.SUPERADMIN)
  @Get('list')
  async findAll(
    @Pagination() pagination: PaginationQueryDto,
  ) {
    return await this.organisationService.findAll(pagination)
  }

  @Roles(ROLE.SUPERADMIN, ROLE.ADMiNSTRATOR)
  @Get(':organisationId')
  async findOnePolly(@Param('organisationId') organisationId: number) {
    return await this.organisationService.findOneOrganisation(organisationId)
  }

  @Roles(ROLE.SUPERADMIN)
  @Post('new-organisation')
  async create(@Body() newOrganisation: NewOrganisation, @CurrentUser() user: User) {
    return await this.organisationService.createOrganization(newOrganisation, user)
  }

  @Roles(ROLE.SUPERADMIN)
  @Put('update/:organisationId')
  async update(@Body() updateInfo: UpdateOrganization, @Param('organisationId', ParseIntPipe) organisationId: number) {
    return await this.organisationService.updateOrganisation(updateInfo, organisationId)
  }
}
