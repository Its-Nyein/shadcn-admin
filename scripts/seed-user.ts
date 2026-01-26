import { hashPassword } from "better-auth/crypto";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { account, user } from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const seedUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin123!@#",
  },
];

async function seed() {
  const forceRecreate = process.argv.includes("--force");
  console.log("Starting user seed...\n");

  for (const seedUser of seedUsers) {
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, seedUser.email))
      .limit(1);

    if (existingUser.length > 0) {
      if (forceRecreate) {
        console.log(`Deleting existing user "${seedUser.email}"...`);
        await db.delete(user).where(eq(user.email, seedUser.email));
      } else {
        console.log(
          `User "${seedUser.email}" already exists, skipping... (use --force to recreate)`,
        );
        continue;
      }
    }

    const hashedPassword = await hashPassword(seedUser.password);

    const [newUser] = await db
      .insert(user)
      .values({
        name: seedUser.name,
        email: seedUser.email,
        emailVerified: true,
      })
      .returning();

    await db.insert(account).values({
      userId: newUser.id,
      accountId: newUser.id,
      providerId: "credential",
      password: hashedPassword,
    });

    console.log(`Created user: ${seedUser.email}`);
  }

  console.log("\nSeed completed!");
  console.log("\nYou can now sign in with:");
  console.log("Email: admin@example.com");
  console.log("Password: Admin123!@#");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
