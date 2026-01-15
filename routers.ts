import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

// Simple barista authentication middleware
const baristaAuthMiddleware = publicProcedure.use(async ({ ctx, next }) => {
  const baristaId = (ctx.req as any).session?.baristaId;
  if (!baristaId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }
  return next({ ctx: { ...ctx, baristaId } });
});

export const appRouter = router({
  system: systemRouter,
  
  // Barista Authentication Router
  barista: router({
    // Login with email and password
    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const barista = await db.verifyBaristaPassword(input.email, input.password);
        if (!barista) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
        }
        
        // Set session cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, JSON.stringify({ baristaId: barista.id, email: barista.email }), cookieOptions);
        
        return {
          success: true,
          barista: {
            id: barista.id,
            email: barista.email,
            name: barista.name,
          },
        };
      }),
    
    // Get current barista session
    me: publicProcedure
      .query(({ ctx }) => {
        const session = (ctx.req as any).session;
        if (!session?.baristaId) return null;
        return { baristaId: session.baristaId, email: session.email };
      }),
    
    // Logout
    logout: publicProcedure
      .mutation(({ ctx }) => {
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
        return { success: true };
      }),
  }),

  // Menu Items Router
  menu: router({
    // Get all menu items by category
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getMenuItemsByCategory(input.category);
      }),
    
    // Get all available menu items by category
    getAvailableByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getAvailableMenuItemsByCategory(input.category);
      }),
    
    // Get all menu items
    getAll: publicProcedure
      .query(async () => {
        return await db.getAllMenuItems();
      }),
  }),

  // Admin Router - for barista inventory management
  admin: router({
    // Update menu item availability (barista only)
    updateItemAvailability: baristaAuthMiddleware
      .input(z.object({ itemId: z.number(), isAvailable: z.boolean() }))
      .mutation(async ({ input }) => {
        return await db.updateMenuItemAvailability(input.itemId, input.isAvailable);
      }),
    
    // Get all menu items for admin
    getAllItems: baristaAuthMiddleware
      .query(async () => {
        return await db.getAllMenuItems();
      }),
  }),

  // Orders Router
  orders: router({
    // Create a new order
    create: publicProcedure
      .input(z.object({
        customerName: z.string(),
        customerPhone: z.string(),
        customerEmail: z.string().optional(),
        totalPrice: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createOrder({
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          customerEmail: input.customerEmail,
          totalPrice: input.totalPrice.toString(),
          notes: input.notes,
        });
      }),
    
    // Get order by ID
    getById: publicProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        return await db.getOrderById(input.orderId);
      }),
  }),

  // Gallery Router
  gallery: router({
    // Get all gallery photos
    getAll: publicProcedure
      .query(async () => {
        return await db.getGalleryPhotos();
      }),
    
    // Add photo to gallery (barista only)
    addPhoto: baristaAuthMiddleware
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string(),
        imageKey: z.string(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.addGalleryPhoto({
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          imageKey: input.imageKey,
          displayOrder: input.displayOrder || 0,
        });
      }),
    
    // Delete photo from gallery (barista only)
    deletePhoto: baristaAuthMiddleware
      .input(z.object({ photoId: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteGalleryPhoto(input.photoId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
