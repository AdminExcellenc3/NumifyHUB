import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const phoneSchema = z
  .string()
  .regex(
    /^(\+[0-9]{1,3})?[0-9\s-]{10,}$/,
    'Please enter a valid phone number'
  )
  .optional()
  .or(z.literal(''));

export const vatNumberSchema = z
  .string()
  .regex(
    /^[A-Z]{2}[0-9A-Z]+$/,
    'Please enter a valid VAT number (e.g., NL123456789B01)'
  )
  .optional()
  .or(z.literal(''));

export const postalCodeSchema = z
  .string()
  .regex(
    /^[0-9]{4}\s?[A-Z]{2}$/,
    'Please enter a valid postal code (e.g., 1234 AB)'
  );