export type Title = {
    id: string;
    name: string;
    isMilitary: boolean;
  };
  
  export type NewTitle = Omit<Title, "id">;