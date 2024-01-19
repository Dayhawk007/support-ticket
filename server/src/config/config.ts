export const DB_CONFIG = {
    connectTimeoutMS: 10000,
    retryWrites: true
}

export enum sortOrder{
    ASC='asc',
    DESC=-'desc'
}

export interface IDBFetchOptions {
    filterOptions?: Record<string, any>; 
    sortOptions?: Record<string, 'asc' | 'desc'>; 
    limit?: number; 
    skip?: number; 
  }

export const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;