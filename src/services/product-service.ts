import {
  addProduct,
  addToFavorites,
  getProductById,
  getUserProducts,
  removeFromFavorites,
} from "@/actions/product-actions";
import { ClassificationResult } from "@/types/product-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ClassificationResult) => {
      const response = await addProduct(data);
      return response;
    },
    onSuccess: () => {
      router.push("/favorite");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getUserProducts"],
        });
      }
    },
  });
};

export const useGetUserProducts = () => {
  return useQuery({
    queryKey: ["getUserProducts"],
    queryFn: async () => {
      const response = await getUserProducts();

      return response;
    },
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["getUserProductById"],
    queryFn: async () => {
      const response = await getProductById(id);

      return response;
    },
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await addToFavorites(id);
      return response;
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getUserProducts"],
        });
      }
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await removeFromFavorites(id);
      return response;
    },
    onSuccess: () => {
      router.back();
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["getUserProducts"],
        });
      }
    },
  });
};
