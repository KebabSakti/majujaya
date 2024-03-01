import { ProductRating } from "../../../../lib/model/product-rating";
import {
  // DebounceFunction,
  Empty,
  ReducerAction,
  ReducerParameter,
} from "../config/type";
import { InternalError } from "./failure";

type DebounceFunction = (...args: any[]) => void;

export async function delay(value: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, value));
}

export function createReducer<T>(
  state: ReducerParameter<T>,
  action: ReducerParameter<T>
) {
  switch (action.type) {
    case ReducerAction.LOAD:
      return {
        ...state,
        payload: action.payload,
        error: null,
      };

    case ReducerAction.ERROR:
      return {
        ...state,
        error: action.error,
      };
  }

  throw new InternalError();
}

export function currency(value: number | bigint | string): string {
  const input = typeof value == "string" ? parseInt(value) : value;

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatted = formatter.format(input);

  return formatted;
}

export function urlParser(
  url: string,
  query?: Record<string, any> | Empty
): string {
  const target = new URL(url);

  if (query) {
    target.search = new URLSearchParams(query).toString();
  }

  return target.href;
}

export function calculateRating(rating: ProductRating[]): number {
  const totalRating = rating.reduce((n, { rating }) => n + rating!, 0);
  const totalUser = rating.length;
  const result = totalRating / totalUser;

  return result;
}

export function debounce(
  func: DebounceFunction,
  delay: number
): [DebounceFunction, () => void] {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debouncedFunction: DebounceFunction = function (...args: any[]): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  const cancelDebounce = (): void => {
    clearTimeout(timeoutId);
  };

  return [debouncedFunction, cancelDebounce];
}

export function invoice(): string {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const prefix = "INV";
  const dateString = day + month + year + hours + minutes + seconds;

  const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number

  return prefix + dateString + randomDigits;
}

export function nl2br(value:string) {
  return value.replace(/(?:\r\n|\r|\n)/g, '<br>');
}
