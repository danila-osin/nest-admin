import { NestAuthModule } from '@nest-admin/auth';
import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from 'db';
import { ProjectsModule } from 'projects';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { UserEntity } from 'users';
import path from 'path';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        NestAuthModule.forRoot({
          api: 'graphql',
          database: {
            type: 'typeorm',
            entities: {
              User: UserEntity,
              Session: class SessionEntity {
                id!: string;
              },
            },
          },
          tokenOptions: {},
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          playground: false,
          autoSchemaFile: path.resolve(__dirname, '../schema.gql'),
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        DatabaseModule.forRoot(),
        DatabaseModule.forFeature(),
        ProjectsModule,
      ],
    };
  }
}

