export interface IComment { 
  content: string;
  author: string;
}
export interface IPost {
  subject: string;
  body: string;
  id: string;
  author: string;
  comments?: IComment[];
}

export interface IChannel {
  name: string;
  id: string;
  email: string;
}