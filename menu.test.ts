import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("menu router", () => {
  it("should get menu items by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // This will return empty array if no items in DB, which is expected
    const result = await caller.menu.getByCategory({ category: "daily" });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get available menu items by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.menu.getAvailableByCategory({ category: "salgados" });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get all menu items", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.menu.getAll();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("admin router", () => {
  it("should check if user is admin - returns false for public user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.admin.isAdmin();
      // Should throw error for unauthenticated user
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });

  it("should check if user is admin - returns true for admin user", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.isAdmin();

    expect(result).toBe(true);
  });

  it("should prevent non-admin from updating item availability", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.admin.updateItemAvailability({
        itemId: 1,
        isAvailable: false,
      });
      // Should throw error for non-admin
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });
});

describe("orders router", () => {
  it("should create a new order", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.orders.create({
      customerName: "João Silva",
      customerPhone: "(54) 99999-9999",
      customerEmail: "joao@example.com",
      totalPrice: 50.00,
      notes: "Sem açúcar",
    });

    // Result should be successful (MySQL returns insert result)
    expect(result).toBeDefined();
  });

  it("should get order by ID", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Try to get a non-existent order (should return null)
    const result = await caller.orders.getById({ orderId: 99999 });

    expect(result).toBeNull();
  });
});

describe("gallery router", () => {
  it("should get all gallery photos", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.gallery.getAll();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should prevent non-admin from adding photos", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.gallery.addPhoto({
        title: "Café Interior",
        description: "Interior do café",
        imageUrl: "https://example.com/photo.jpg",
        imageKey: "cafe/interior.jpg",
        displayOrder: 1,
      });
      // Should throw error for non-admin
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });

  it("should prevent non-admin from deleting photos", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.gallery.deletePhoto({ photoId: 1 });
      // Should throw error for non-admin
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });
});
