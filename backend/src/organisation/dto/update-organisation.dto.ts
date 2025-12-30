import { IsBoolean, IsOptional } from "class-validator";
import { NewOrganisation } from "./new-organisation.dto";
import { PartialType } from '@nestjs/swagger'
export class UpdateOrganization extends PartialType(NewOrganisation) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}