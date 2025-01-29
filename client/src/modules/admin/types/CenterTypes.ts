export type Center = {
    id: string;
    name: string;
    location: string;
    head: string;
    isHeadquarters: boolean;
  };
  
  export type NewCenter = Omit<Center, "id">;