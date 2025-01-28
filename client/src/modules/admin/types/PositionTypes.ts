export type Position = {
    id: string;
    name: string;
  };
  
  export type NewPosition = Omit<Position, "id">;