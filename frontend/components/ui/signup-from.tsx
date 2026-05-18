"use client";

import * as React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

// Create signup form schema
const signupSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters.")
      .max(32, "Name must be at most 32 characters.")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Name must contain only numbers and letters."
      ),

    email: z.email("Please enter a valid email address."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: signupSchema,
    },

    onSubmit: async ({ value }) => {
      if (loading) return;

      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
          callbackURL: "/dashboard",
        },

        {
          onRequest: () => {
            setLoading(true);
          },

          onSuccess: () => {
            router.push("/dashboard");
          },

          onError: (ctx) => {
            setLoading(false);
            alert(ctx.error.message);
          },
        }
      );
    },
  });

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          Create your account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field
                    data-invalid={isInvalid}
                  >
                    <FieldLabel htmlFor={field.name}>
                      Full Name
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="John Doe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field
                    data-invalid={isInvalid}
                  >
                    <FieldLabel htmlFor={field.name}>
                      Email
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="m@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field
                    data-invalid={isInvalid}
                  >
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />

                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field
                    data-invalid={isInvalid}
                  >
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <Field>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </Field>

            <FieldSeparator>
              Or continue with
            </FieldSeparator>
            <Field>
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/dashboard",
                    newUserCallbackURL: "/dashboard",
                    errorCallbackURL: "/signup",
                  });
                }}
              >
                Sign up with Google
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="underline underline-offset-4"
                >
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}