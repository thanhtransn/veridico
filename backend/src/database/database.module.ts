import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { databaseConfig } from "./database.configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
            isGlobal: true,
            envFilePath: ['.env']
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => 
                config.get<TypeOrmModuleOptions>('typeorm') || {}
        })
    ],
    exports: [ConfigModule, TypeOrmModule]
})

export class DatabaseModule{}