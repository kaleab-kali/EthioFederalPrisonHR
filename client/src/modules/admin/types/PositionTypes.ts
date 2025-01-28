export type Position = {
  _id?: string;
  posId: string;
  posName: string;
};
  
  export type NewPosition = Omit<Position, "posId">;