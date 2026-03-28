import React, { FormEvent, useState } from "react";
import { buildMailtoHref, validateContact, type ContactInput } from "../lib/contact";

const INITIAL_VALUES: ContactInput = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateContact(values);
    setErrors(result.errors);

    if (!result.ok) {
      return;
    }

    window.location.href = buildMailtoHref(values);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-group">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) =>
            setValues((current) => ({ ...current, name: event.target.value }))
          }
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((current) => ({ ...current, email: event.target.value }))
          }
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <button type="submit">Send message</button>

      <p>
        Prefer email directly?{" "}
        <a href="mailto:ejsadiarin@gmail.com">ejsadiarin@gmail.com</a>
      </p>
    </form>
  );
}
