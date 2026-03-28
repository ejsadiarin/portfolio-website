export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

type ContactField = keyof ContactInput;

export type ContactValidationResult = {
  ok: boolean;
  errors: Partial<Record<ContactField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAILTO_TARGET = "mailto:ejsadiarin@gmail.com";

export function validateContact(input: ContactInput): ContactValidationResult {
  const errors: Partial<Record<ContactField, string>> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) {
    errors.name = "Name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!message) {
    errors.message = "Message is required";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(input: ContactInput): string {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  );

  return `${MAILTO_TARGET}?subject=${subject}&body=${body}`;
}
