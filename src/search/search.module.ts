import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTIC_SEARCH_HOST') + ':' + configService.get('ELASTIC_SEARCH_PORT'),
        // IMPORTANT: auth not required in our case as we are connecting on local with docker
        // auth: {
        //   username: configService.get('ELASTIC_SEARCH_USERNAME'),
        //   password: configService.get('ELASTIC_PASSWORD'),
        // },
        maxRetries: configService.get('ELASTIC_SEARCH_MAX_RETRIES'),
        requestTimeout: configService.get('ELASTIC_SEARCH_REQ_TIMEOUT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [ElasticsearchModule]
})
export class SearchModule {}
