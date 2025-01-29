export type Title = {
    titleId: string;
    titleName: string;
    isMilitary: boolean;
  };
  
  export type NewTitle = Omit<Title, "id">;