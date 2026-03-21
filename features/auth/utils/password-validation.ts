import React from "react";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

export const ALLOWED_PASSWORD_CHARS = /^[A-Za-z\d!@#$%^&*]*$/;

export function blockDisallowedPasswordChars(
  e: React.FormEvent<HTMLInputElement>,
) {
  const event = e as unknown as InputEvent;
  if (event.data && !ALLOWED_PASSWORD_CHARS.test(event.data)) {
    e.preventDefault();
  }
}
