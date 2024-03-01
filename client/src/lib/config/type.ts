import { ReactElement } from "react";

export type Empty = null | undefined;

export enum ReducerAction {
  LOAD = "LOAD",
  ERROR = "ERROR",
}

export type PropData<T> = {
  data?: T;
  children?: ReactElement;
};

export type FailureData = {
  code: number;
  message: string;
};

export type StateType<T> = {
  value: T;
};

export type StateData<T> = {
  data?: T | Empty;
  error?: FailureData | Empty;
};

export type ReducerParameter<T> = {
  type?: ReducerAction | Empty;
  payload?: T | Empty;
  error?: FailureData | Empty;
};

export type Paginate = {
  page: number;
  total: number;
};

export type Result<T> = {
  data?: T | Empty;
  paginate?: Paginate | Empty;
};

export type DataState<T> = {
  status: string;
  data?: T | Empty;
  error?: Error | Empty;
};

export type DebounceFunction = (...args: any[]) => void;
