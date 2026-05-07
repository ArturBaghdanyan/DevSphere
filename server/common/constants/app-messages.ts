export const APP_MESSAGES = {
  USER: {
    NOT_FOUND: (id: number | string) => `User with ID ${id} not found`,
    ALREADY_EXISTS: 'User with this email already exists',
  },
  AUTH: {
    INVALID_LOGIN: 'Invalid email or password',
    UNAUTHORIZED: 'You are not authorized to perform this action',
  },
} as const;
