import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
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
    // Check if user is admin
    isAdmin: protectedProcedure
      .query(({ ctx }) => {
        return ctx.user?.role === 'admin';
      }),
    
    // Update menu item availability (admin only)
    updateItemAvailability: protectedProcedure
      .input(z.object({ itemId: z.number(), isAvailable: z.boolean() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can update availability' });
        }
        return await db.updateMenuItemAvailability(input.itemId, input.isAvailable);
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
    
    // Add photo to gallery (admin only)
    addPhoto: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string(),
        imageKey: z.string(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can add photos' });
        }
        return await db.addGalleryPhoto({
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          imageKey: input.imageKey,
          displayOrder: input.displayOrder || 0,
        });
      }),
    
    // Delete photo from gallery (admin only)
    deletePhoto: protectedProcedure
      .input(z.object({ photoId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admins can delete photos' });
        }
        return await db.deleteGalleryPhoto(input.photoId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
