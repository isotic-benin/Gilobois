"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn, signOut, auth } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { ROLES } from "@/lib/constants";
import { connexionSchema } from "@/lib/zod-schemas/auth";
import { retourErreurs, type ActionState } from "@/lib/zod-schemas/shared";

export async function connexion(
  prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const validation = connexionSchema.safeParse({
    email: formData.get("email"),
    motDePasse: formData.get("motDePasse"),
  });

  if (!validation.success) {
    return retourErreurs(validation.error);
  }

  await dbConnect();
  const utilisateur = await User.findOne({ email: validation.data.email });
  if (!utilisateur) {
    return { message: "E-Mail oder Passwort falsch." };
  }

  if (utilisateur.role !== ROLES.ADMIN && utilisateur.role !== ROLES.GERANT) {
    return {
      message: "Zugang nur für Administratoren.",
    };
  }

  if (!utilisateur.emailVerifie) {
    return {
      message:
        "Konto nicht bestätigt. Der Administrationszugang erfordert ein verifiziertes Konto.",
    };
  }

  try {
    const url = await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.motDePasse,
      redirect: false,
    });

    if (!url) {
      return { message: "E-Mail oder Passwort falsch." };
    }

    const session = await auth();
    const role = session?.user?.role;

    if (role === ROLES.ADMIN) {
      redirect("/admin");
    }
    if (role === ROLES.GERANT) {
      redirect("/gerant");
    }
    redirect("/admin/login");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "E-Mail oder Passwort falsch." };
        default:
          return { message: "Ein Fehler ist bei der Anmeldung aufgetreten." };
      }
    }
    throw error;
  }
}

export async function deconnexion(): Promise<void> {
  await signOut({ redirectTo: "/" });
}