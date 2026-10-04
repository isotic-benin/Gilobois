"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { connexion } from "@/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(connexion, undefined);

  return (
    <Card className="w-full max-w-md border-none shadow-xl shadow-black/5 bg-white rounded-2xl overflow-hidden p-2">
      <CardHeader>
        <CardTitle className="text-xl">Administrations-Anmeldung</CardTitle>
        <CardDescription>
          Zugang nur für Brennstoffe Nagler-Mitarbeiter.
        </CardDescription>
      </CardHeader>
      <form action={formAction} className="grid gap-4">
        <CardContent className="grid gap-4 pt-0">
          <div className="grid gap-2">
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="sie@brennstoffenagler.de"
              autoComplete="email"
              autoFocus
              aria-invalid={Boolean(state?.erreurs?.email)}
            />
            {state?.erreurs?.email && (
              <p className="text-sm text-destructive" role="alert">
                {state.erreurs.email[0]}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="motDePasse">Passwort</Label>
            <Input
              id="motDePasse"
              name="motDePasse"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(state?.erreurs?.motDePasse)}
            />
            {state?.erreurs?.motDePasse && (
              <p className="text-sm text-destructive" role="alert">
                {state.erreurs.motDePasse[0]}
              </p>
            )}
          </div>

          {state?.message && (
            <p
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              {state.message}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full h-11 text-[15px] font-bold tracking-wide"
            disabled={pending}
          >
            {pending ? "Anmelden…" : "Anmelden"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
