import { Article } from "@prisma/client";

export interface UserArticle {
  id: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  views: number;
  authorId: string;
  likes: {
    id: string;
    createdAt: Date;
    articleId: string;
    userId: string;
  }[];
}
