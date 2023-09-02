export type AuthFields<T> = Array<{
  label: string;
  name: T;
  icon: React.ReactNode;
  placeholder: string;
}>;
