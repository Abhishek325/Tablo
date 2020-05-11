export interface Table {
  id: number;
  name: string;
  createdOn: string;
  fields?: Field[];
}

export interface Field {
  id?: number;
  name: string;
  value?: string;
}
