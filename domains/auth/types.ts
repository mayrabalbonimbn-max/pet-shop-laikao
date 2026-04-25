export type UserRole =
  | "super_admin"
  | "manager"
  | "operations"
  | "catalog"
  | "finance"
  | "marketing";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
