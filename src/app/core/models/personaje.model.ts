export interface Personaje {
  id: number;
  name: string;
  job: string;
  bounty: string;
  status: string;
  age: string;
  birthday: string;
  filename: string;
  technicalFile: string;
  crew?: {
    name: string;
  };
  fruit?: {
    name: string;
    type: string;
  };
}