import {
  MongooseBaseQueryOptionKeys,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
} from 'mongoose';

export interface DBQueryFindParams<T> {
  filter?: RootFilterQuery<T>;
  projection?: ProjectionType<T>;
  options?: QueryOptions<T>;
}

export interface DBQueryFindParamsWithoutFilter<T> {
  projection?: ProjectionType<T>;
  options?: QueryOptions<T>;
}

export interface DBQueryDeleteParams<T> {
  filter?: RootFilterQuery<T>;
  options?: Pick<QueryOptions<T>, MongooseBaseQueryOptionKeys> & {
    [other: string]: any;
  };
}
