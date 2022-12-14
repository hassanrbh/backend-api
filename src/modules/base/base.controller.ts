// import {
//   Controller,
//   Get,
//   Post,
//   Delete,
//   Put,
//   Body,
//   Param,
//   Header,
//   HttpCode,
// } from '@nestjs/common';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { IBaseService } from './IBase.service';
// import { BaseEntity } from './base.entity';

// export class BaseController<T extends BaseEntity> {
//   constructor(private readonly IBaseService: IBaseService<T>) {}

//   @Get()
//   @ApiOperation({ summary: 'Get All Projects Of a Given Tenant' })
//   @ApiResponse({ status: 200, description: 'Get All Projects' })
//   @Header('Content-Type', 'application/json')
//   @HttpCode(200)
//   @ApiResponse({ status: 200, description: 'Ok' })
//   async findAll(): Promise<T[]> {
//     return this.IBaseService.getAll();
//   }

//   @Get(':id')
//   @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
//   @ApiResponse({ status: 404, description: 'Entity does not exist' })
//   async findById(@Param('id') id: string): Promise<T> {
//     return this.IBaseService.get(id);
//   }

//   @Post()
//   @ApiResponse({
//     status: 201,
//     description: 'The record has been successfully created.',
//   })
//   @ApiResponse({ status: 403, description: 'Forbidden.' })
//   @ApiResponse({ status: 400, description: 'Bad Request.' })
//   async create(@Body() entity: any): Promise<T> {
//     return this.IBaseService.create(entity);
//   }

//   @Delete(':id')
//   @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
//   @ApiResponse({ status: 400, description: 'Bad Request.' })
//   async delete(@Param('id') id: string) {
//     this.IBaseService.delete(id);
//   }

//   @Put()
//   @ApiResponse({ status: 400, description: 'Bad Request.' })
//   @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
//   async update(@Body() entity: T): Promise<T> {
//     return this.IBaseService.update(entity);
//   }
// }
