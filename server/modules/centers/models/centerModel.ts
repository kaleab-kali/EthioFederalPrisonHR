import mongoose, { Schema, Document } from 'mongoose';
import { ICenter } from '../types/centerType';



const CenterSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  centerId: { type: String, unique: true },
});

CenterSchema.pre<ICenter>('save', async function (next) {
  if (!this.centerId) {
    const lastCenter = await Center.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );
    let lastCenterNumber = 0;

    if (lastCenter && lastCenter.centerId) {
      const lastCenterIdParts = lastCenter.centerId.split('-');
      lastCenterNumber = parseInt(lastCenterIdParts[1]);
    }

    this.centerId = `${this.name.trim().replace(/\s+/g, '')}-${(lastCenterNumber + 1).toString().padStart(2, '0')}`;

  }
  next();
});

const Center = mongoose.model<ICenter>('Center', CenterSchema);

export default Center;
