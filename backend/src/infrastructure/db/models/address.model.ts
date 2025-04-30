import mongoose, { Schema } from 'mongoose';
import { IAddressDocument } from '../../../domain/interfaces/address.interface';

const AddressSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AddressModel = mongoose.model<IAddressDocument>('Address', AddressSchema);

export default AddressModel;
