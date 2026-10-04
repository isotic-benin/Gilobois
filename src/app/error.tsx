"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErreurGlobale({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-6xl font-bold text-primary">500</p>
      <h1 className="text-2xl font-bold">Ein Fehler ist aufgetreten</h1>
      <p className="max-w-md text-muted-foreground">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut
        oder kehren Sie zur Startseite zurück.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Erneut versuchen</Button>
        <Button variant="outline" asChild>
          <Link href="/">Zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
}