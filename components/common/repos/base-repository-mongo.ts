import { Inject, Injectable } from '@nestjs/common';
import {
  AnyBulkWriteOperation,
  BulkWriteResult,
  ClientSession,
  Db,
  Filter,
  FilterOperations,
  FindOneAndUpdateOptions,
  InferIdType,
  MongoClient,
  OptionalUnlessRequiredId,
  TransactionOptions,
  UpdateFilter,
  WithId,
} from 'mongodb';
import { BaseRepositoryInterface } from './base-repository.interface';

@Injectable()
export class BaseRepository<T> implements BaseRepositoryInterface<T> {
  protected readonly _db: Db;
  protected readonly entity: string;
  @Inject('MONGODB_PROVIDER')
  protected readonly client: MongoClient;

  constructor(entity: string) {
    this._db = this.client.db('nestjs-mongo-sample');
    this.entity = entity;
  }

  async executeTransaction(
    callback: (db: Db, session: ClientSession) => void,
    options?: TransactionOptions,
  ): Promise<boolean> {
    const session = this.client.startSession();
    try {
      await session.withTransaction(async () => {
        await callback(this._db, session);
      }, options);
    } catch (e) {
      return false;
    } finally {
      await session.endSession();
    }
    return true;
  }

  async search(
    entity: string,
    limit: number,
    filters: FilterOperations<T>,
    projection?: Record<string, unknown>,
  ): Promise<WithId<T>[]> {
    const searchQuery: Filter<T> = {
      $or: Object.entries(filters).map(([key, value]) => {
        return { [key]: { $regex: value, $options: 'i' } };
      }),
    } as Filter<T>;
    return this._db
      .collection<T>(entity)
      .find(searchQuery, { projection })
      .limit(limit)
      .toArray();
  }

  async aggregate(
    entity: string,
    pipes: Array<Record<string, unknown>>,
  ): Promise<Array<unknown>> {
    return this._db.collection(entity).aggregate(pipes).toArray();
  }

  async count(entity: string, filters: Filter<T>): Promise<any> {
    return this._db.collection<T>(entity).countDocuments(filters);
  }

  async findAll(
    skip: number,
    limit: number,
    filters: Filter<T>,
    projection?: Record<string, unknown>,
  ): Promise<WithId<T>[]> {
    return this._db
      .collection<T>(this.entity)
      .find(filters, { projection })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  async findOne(
    filters: Filter<T>,
    projection?: Record<string, unknown>,
  ): Promise<WithId<T> | null> {
    return this._db.collection<T>(this.entity).findOne(filters, { projection });
  }

  async create(data: T): Promise<InferIdType<T>> {
    const { insertedId } = await this._db
      .collection<T>(this.entity)
      .insertOne(data as OptionalUnlessRequiredId<T>);
    return insertedId;
  }

  async bulkInsert(entity: string, data: Array<T>): Promise<boolean> {
    const bulkOp = this._db.collection<T>(entity).initializeUnorderedBulkOp();

    data.forEach((segment) => {
      bulkOp.insert(segment);
    });
    const { nInserted } = await bulkOp.execute();
    return nInserted > 0;
  }

  async updateOne(
    entity: string,
    filters: Filter<T>,
    data: Partial<T>,
  ): Promise<boolean> {
    const { modifiedCount } = await this._db
      .collection<T>(entity)
      .updateOne(filters, { $set: { ...data, updatedAt: new Date() } });
    return modifiedCount > 0;
  }

  async findOneAndUpdate(
    entity: string,
    query: Filter<T>,
    data: Partial<T> | UpdateFilter<T>,
    options?: FindOneAndUpdateOptions,
  ): Promise<T> {
    return this._db.collection<T>(entity).findOneAndUpdate(query, data, {
      ...options,
    }) as Promise<any>;
  }

  async bulkUpdate(
    entity: string,
    filters: Filter<T>,
    data: Array<T>,
  ): Promise<boolean> {
    const bulkOp = this._db.collection<T>(entity).initializeUnorderedBulkOp();

    data.forEach((segment) => {
      bulkOp
        .find(filters)
        .update({ $set: { ...segment, updatedAt: new Date() } });
    });
    const { nModified, nUpserted } = await bulkOp.execute();
    return nModified > 0 || nUpserted > 0;
  }

  async deleteOne(entity: string, filters: Filter<T>): Promise<boolean> {
    const { deletedCount } = await this._db
      .collection<T>(entity)
      .deleteOne(filters);
    return deletedCount! > 0;
  }

  async bulkDelete(entity: string, filters: Filter<T>): Promise<boolean> {
    const bulkOp = this._db.collection<T>(entity).initializeUnorderedBulkOp();

    bulkOp.find(filters).delete();
    const { nRemoved } = await bulkOp.execute();
    return nRemoved > 0;
  }

  async bulkWrite(
    entity: string,
    query: Array<AnyBulkWriteOperation<T>>,
  ): Promise<BulkWriteResult> {
    return this._db.collection<T>(entity).bulkWrite(query);
  }
}
