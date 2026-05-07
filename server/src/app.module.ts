import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from '../common/models/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARIABLES } from '../common/constants/env_constants';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(ENV_VARIABLES.DB_HOST),
        port: configService.get<number>(ENV_VARIABLES.DB_PORT),
        username: configService.get<string>(ENV_VARIABLES.DB_USER),
        password: configService.get<string>(ENV_VARIABLES.DB_PASSWORD),
        database: configService.get<string>(ENV_VARIABLES.DB_NAME),
        entities: [User],
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    UsersModule,
    AuthModule,
    ApiGatewayModule,
  ],
})
export class AppModule {}
