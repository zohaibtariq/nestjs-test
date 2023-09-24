import {Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Put} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/create-index')
  async createIndex(@Body() indexBody: { index: string; settings: any, mappings: any }) { // IMPORTANT: responsible for creating elastic search index
    try {
      const result = await this.searchService.createIndex(indexBody);
      return { message: `Index ${indexBody?.index} created successfully.`, result };
    } catch (error) {
      console.error(error)
      throw new HttpException(`Failed to create index ${indexBody?.index}.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/delete-index')
  async deleteIndex(@Body('index') index: string) { // IMPORTANT: responsible for deleting elastic search index
    try {
      const result = await this.searchService.deleteIndex(index);
      return { message: `Index ${index} deleted successfully.`, result };
    } catch (error) {
      console.error(error)
      throw new HttpException(`Failed to delete index ${index}.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('search')
  async search(@Body() requestBody: { index: string; query: any }) { // IMPORTANT: responsible for performing search in elastic search
    const { index, query } = requestBody;
    return await this.searchService.search(index, query);
  }

  @Post('/create-document/:index/:documentId')
  async createDocument( // IMPORTANT: responsible for creating document on provided index
      @Param('index') index: string,
      @Param('documentId') documentId: string,
      @Body() documentData: any,
  ) {
    return this.searchService.createDocument(index, documentId, documentData);
  }

  @Put('/update-document/:index/:documentId')
  async updateDocument( // IMPORTANT: responsible for updating document on provided index
      @Param('index') index: string,
      @Param('documentId') documentId: string,
      @Body() documentData: any,
  ) {
    return this.searchService.updateDocument(index, documentId, documentData);
  }

  @Delete('/delete-document/:index/:documentId')
  async deleteDocument( // IMPORTANT: responsible for deleting document on provided index
      @Param('index') index: string,
      @Param('documentId') documentId: string,
  ) {
    return this.searchService.deleteDocument(index, documentId);
  }

}
