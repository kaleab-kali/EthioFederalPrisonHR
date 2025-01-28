import mongoose, { Types, Schema, Document } from 'mongoose';
import { TitleInfo } from '../types/titleTypes';


const titleInfoSchema = new Schema<TitleInfo>(
  {
    titleId: { type: String },
    titleName: { type: String },
    isMilitary: { type: Boolean },
  },
  { timestamps: true },
);

titleInfoSchema.pre<TitleInfo>('save', async function (next) {
  if (!this.titleId) {
    const lastTitle = await TitleModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );
    let lastTitleNumber = 0;
    if (lastTitle && lastTitle.titleId) {
      lastTitleNumber = parseInt(lastTitle.titleId.split('-')[1]);
    }
    this.titleId = `T-${(lastTitleNumber + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const TitleModel = mongoose.model<TitleInfo>('Titles', titleInfoSchema);

export default TitleModel;
