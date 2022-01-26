export interface IPost {
  subject: string;
  body: string;
  id: string;
}

export interface IChannel {
  name: string;
  id: string;
  posts?: IPost[];
}