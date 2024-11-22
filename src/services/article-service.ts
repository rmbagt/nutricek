import {
  addArticleLikes,
  getAllArticles,
  getArticleById,
  getPopularArticle,
  getTrendingArticle,
  getUserArticles,
  removeArticleLikes,
} from "@/actions/article-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/actions/article-actions";

export const useGetAllArticles = () => {
  return useQuery({
    queryKey: ["getAllArticles"],
    queryFn: async () => {
      const response = await getAllArticles();

      return response;
    },
  });
};

export const useGetUserArticles = () => {
  return useQuery({
    queryKey: ["getUserArticles"],
    queryFn: async () => {
      const response = await getUserArticles();

      return response;
    },
  });
};

export const useGetPopularArticles = () => {
  return useQuery({
    queryKey: ["getPopularArticles"],
    queryFn: async () => {
      const response = await getPopularArticle();

      return response;
    },
  });
};

export const useGetTrendingArticles = () => {
  return useQuery({
    queryKey: ["getTrendingArticles"],
    queryFn: async () => {
      const response = await getTrendingArticle();

      return response;
    },
  });
};

export const useGetArticleById = (id: string) => {
  return useQuery({
    queryKey: ["getArticleById"],
    queryFn: async () => {
      const response = await getArticleById(id);

      return response;
    },
  });
};

export const useAddArticleLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { articleId: string; userId: string }) => {
      const response = await addArticleLikes(data.articleId, data.userId);
      return response;
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getArticleById"],
        });
      }
    },
  });
};

export const useRemoveArticleLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { articleId: string; userId: string }) => {
      const response = await removeArticleLikes(data.articleId, data.userId);
      return response;
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getArticleById"],
        });
      }
    },
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      image: string;
      category: string;
    }) => {
      const response = await createArticle(data);
      return response;
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getAllArticles"],
        });
      }
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      title?: string;
      content?: string;
      image?: string;
      category?: string;
    }) => {
      const response = await updateArticle(data.id, data);
      return response;
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getArticleById"],
        });
      }
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteArticle(id);
      return response;
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getAllArticles"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["getUserArticles"],
        });
      }
    },
  });
};
