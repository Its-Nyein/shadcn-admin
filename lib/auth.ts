export function hasRole(userRole: string | undefined, requiredRole: string): boolean {
  if (!userRole) return false;
  return userRole === requiredRole;
}

export function hasAnyRole(userRole: string | undefined, roles: string[]): boolean {
  if (!userRole) return false;
  return roles.includes(userRole);
}

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}

export function getLoginRedirectUrl(callbackUrl?: string | null): string {
  if (!callbackUrl) return "/";

  try {
    const url = new URL(callbackUrl, window.location.origin);
    if (url.origin === window.location.origin) {
      return callbackUrl;
    }
  } catch {}

  return "/";
}

export function getUserInitials(name: string): string {
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
