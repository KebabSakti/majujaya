export type Paginate = {
  page: number;
  total: number;
};

export type Result<T> = {
  data?: T | Empty;
  paginate?: Paginate | Empty;
};

export type Empty = null | undefined;
