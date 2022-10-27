import { Injectable } from '@nestjs/common';
import { BaseRepositoryInterface } from './base-repository.interface';
import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  UpdateResult,
  Connection,
} from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class TypeormRepository<T> implements BaseRepositoryInterface<T> {
  private entity: string;
  constructor(
    entity: string,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {
    this.entity = entity;
  }

  create<T>(data: DeepPartial<T>): Promise<T> {
    const newEntity = this.entityManager.create<T>(this.entity, data);
    return this.entityManager.save(newEntity);
  }

  findAll(query: Record<string, unknown>): Promise<Array<T>> {
    return this.entityManager.find<T>(this.entity, query);
  }

  findOne(data: Record<string, unknown>): Promise<T> {
    return this.entityManager.findOne<T>(this.entity, data);
  }

  update(id: string, data: DeepPartial<T>): Promise<UpdateResult> {
    return this.entityManager.update(this.entity, id, data);
  }

  delete(query: Record<string, unknown>): Promise<DeleteResult> {
    return this.entityManager.delete(this.entity, query);
  }
}
