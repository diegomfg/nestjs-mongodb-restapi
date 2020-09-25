import { Document } from 'mongoose';

/**
 * Has to extend from Document in order to be injected into the product service
 */
export interface Product extends Document{
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly createdAt: Date; 
}