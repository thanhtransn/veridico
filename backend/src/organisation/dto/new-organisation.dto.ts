import { ArrayMinSize, IsArray, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MIN_LENGTH, MinLength, ValidateNested } from 'class-validator'
export class NewOrganisation {
  @IsString()
  @IsNotEmpty()
  companyName: string
  
  @IsString()
  @IsNotEmpty()
  uen: string
  
  @IsString()
  @IsNotEmpty()
  registeredAddress: string
  
  @IsString()
  @IsNotEmpty()
  businessType: string
  
  @IsDateString()
  @IsNotEmpty()
  dateOfincorporation: Date
  
  @IsString()
  @IsNotEmpty()
  natrueOfBusiness: string
  
  @IsString()
  @IsNotEmpty()
  StatusOfCompany: string

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  administrators: string[]
  
  @IsNumber()
  @IsOptional()
  companySize?: number
  
  @IsString()
  @IsOptional()
  paidUpCapital?: string
}
