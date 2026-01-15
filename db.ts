import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import bcrypt from "bcrypt";
import { InsertUser, users, menuItems, orders, galleryPhotos, InsertOrder, InsertGalleryPhoto, baristaCredentials, InsertBaristaCredential, BaristaCredential } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL);
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _client = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    // PostgreSQL upsert using ON CONFLICT
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: {
        name: values.name,
        email: values.email,
        loginMethod: values.loginMethod,
        role: values.role,
        lastSignedIn: values.lastSignedIn,
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Menu Items Functions
export async function getMenuItemsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(menuItems).where(eq(menuItems.category, category as any));
}

export async function getAvailableMenuItemsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(menuItems)
    .where(eq(menuItems.category, category as any));
}

export async function getAllMenuItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(menuItems);
}

export async function updateMenuItemAvailability(itemId: number, isAvailable: boolean) {
  const db = await getDb();
  if (!db) return null;
  return db.update(menuItems)
    .set({ isAvailable, updatedAt: new Date() })
    .where(eq(menuItems.id, itemId));
}

// Orders Functions
export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(orders).values(order);
  return result;
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Gallery Functions
export async function getGalleryPhotos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(galleryPhotos).orderBy(galleryPhotos.displayOrder);
}

export async function addGalleryPhoto(photo: InsertGalleryPhoto) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(galleryPhotos).values(photo);
}

export async function deleteGalleryPhoto(photoId: number) {
  const db = await getDb();
  if (!db) return null;
  return db.delete(galleryPhotos).where(eq(galleryPhotos.id, photoId));
}

// Barista Authentication Functions
export async function createBaristaCredential(email: string, password: string, name: string) {
  const db = await getDb();
  if (!db) return null;
  
  const passwordHash = await bcrypt.hash(password, 10);
  return db.insert(baristaCredentials).values({
    email,
    passwordHash,
    name,
  });
}

export async function getBaristaByEmail(email: string): Promise<BaristaCredential | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(baristaCredentials)
    .where(eq(baristaCredentials.email, email))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function verifyBaristaPassword(email: string, password: string): Promise<BaristaCredential | null> {
  const barista = await getBaristaByEmail(email);
  if (!barista) return null;
  
  const isValid = await bcrypt.compare(password, barista.passwordHash);
  return isValid ? barista : null;
}
