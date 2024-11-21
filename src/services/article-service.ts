import {
  addArticleLikes,
  getArticleById,
  getUserArticles,
  removeArticleLikes,
} from "@/actions/article-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserArticles = () => {
  return useQuery({
    queryKey: ["getUserArticles"],
    queryFn: async () => {
      const response = await getUserArticles();

      return response;
    },
  });
};

export const useGetArticleById = (id: string) => {
  return useQuery({
    queryKey: ["getArticleById", id],
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
