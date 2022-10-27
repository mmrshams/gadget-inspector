export interface BaseRepositoryInterface<T> {
  save?(data: T): Promise<T>;
  create?(data: any): Promise<any>;
  findById?(data: string | number): Promise<T>;
  deleteById?(data: string | number): Promise<Record<string, unknown>>;
  runQuery?(query: string): Promise<Array<Record<string, unknown>>>;

  findOne:
    | ((data: Record<string, unknown> | string) => Promise<T>)
    | ((filters: any, projection?: Record<string, unknown>) => Promise<any>);

  findAll:
    | ((
        skip: number,
        limit: number,
        filters: Record<string, unknown>,
        projection?: Record<string, unknown>,
      ) => Promise<any[]>)
    | ((data: Record<string, unknown>) => Promise<any[]>);
}
