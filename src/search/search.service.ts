import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import FilmsIndex from "../films/utils/FilmsIndex";

@Injectable()
export class SearchService {

  constructor(
      private readonly esService: ElasticsearchService,
      private readonly configService: ConfigService,
  ) {}

  async isIndexExists(index){
    const checkIndex = await this.esService.indices.exists({index})
    return checkIndex
  }

  async createIndex(indexBody: { index: string; settings: any, mappings: any }) { // IMPORTANT: responsible for creating index with settings and mappings in search engine
    try {
      if(!await this.isIndexExists(indexBody.index)){ // IMPORTANT: if index not exists then allow to create
        return await this.esService.indices.create(indexBody);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteIndex(index: string) {
    try {
      if(await this.isIndexExists(index)){ // IMPORTANT: if index exists then allow to delete
        return await this.esService.indices.delete({
          index,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async search(index: string, searchQuery: any) { // IMPORTANT: responsible for performing search over search engine at defined index
    try {
      if(!index || !await this.isIndexExists(index)){
        // IMPORTANT we should throw exception here if search is called without creating index but for now we will create it
        await this.createIndex({...FilmsIndex, index: this.configService.get('ELASTIC_SEARCH_INDEX')})

      }
      let results = new Set();
      const response = await this.esService.search(
          {
            index,
            body: {
              query: searchQuery
            }
          }
      );
      return response
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async createDocument(index: string, documentId: string, documentData: any) { // IMPORTANT: responsible for creating document in search engine at defined index
    try {
      const response = await this.esService.index({
        index,
        id: documentId,
        body: documentData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateDocument(index: string, documentId: string, documentData: any) { // IMPORTANT: responsible for updating document in search engine at defined index
    try {
      const response = await this.esService.update({
        index,
        id: documentId,
        body: {
          doc: documentData,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(index: string, documentId: string) { // IMPORTANT: responsible for deleting document in search engine at defined index
    try {
      const response = await this.esService.delete({
        index,
        id: documentId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
