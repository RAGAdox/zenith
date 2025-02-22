export type PasswordAction =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    }
  | null;
