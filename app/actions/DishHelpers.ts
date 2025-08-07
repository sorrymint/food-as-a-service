export interface DishFormState<T> {
  errors?: StringMap;
  successMsg?: string;
  data?: T;
  blurs?: StringToBooleanMap;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}
