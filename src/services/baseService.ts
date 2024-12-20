// Generic interface for CRUD operations
export interface BaseService<T> {
  getAll(): Promise<T[]>;
  create(item: Partial<T>): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

// Error handling utility
export class ServiceError extends Error {
  constructor(
    public originalError: any, 
    public context?: Record<string, unknown>
  ) {
    super(originalError.message);
    this.name = 'ServiceError';
  }
}

// Generic error handler for service operations
export function handleServiceError(error: any, context?: Record<string, unknown>): never {
  throw new ServiceError(error, context);
}
