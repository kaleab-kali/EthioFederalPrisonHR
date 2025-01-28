import mongoose, { Schema, Document } from 'mongoose';
import { PositionInfo } from '../types/positionTypes';



const positionInfoSchema = new Schema<PositionInfo>(
  {
    posId: { type: String },
    posName: { type: String },
  },
  { timestamps: true },
);
positionInfoSchema.pre<PositionInfo>('save', async function (next) {
  if (!this.posId) {
    const lastTitle = await PositionModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );
    let lastTitleNumber = 0;
    if (lastTitle && lastTitle.posId) {
      lastTitleNumber = parseInt(lastTitle.posId.split('-')[1]);
    }
    this.posId = `POS-${(lastTitleNumber + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const PositionModel = mongoose.model<PositionInfo>(
  'Positions',
  positionInfoSchema,
);

export default PositionModel;
