import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import { cn } from "@/utils";
import { loginSchema, type LoginFormData } from "../schemas";
import { useLogin } from "../hooks";

export default function LoginForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Auto-focus email field on mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const { ref: emailRef, ...emailRegister } = register("email");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={!!errors.email}
            className="pl-10"
            {...emailRegister}
            ref={(e) => {
              emailRef(e);
              (
                emailInputRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = e;
            }}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-danger-600 dark:text-danger-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" required>
            Password
          </Label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={!!errors.password}
            className="pl-10"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-danger-600 dark:text-danger-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" isLoading={isPending}>
        {!isPending && <LogIn className="h-4 w-4 mr-2" />}
        Sign In
      </Button>

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className={cn(
            "font-medium text-primary-600 hover:text-primary-700",
            "dark:text-primary-400 dark:hover:text-primary-300",
          )}
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
