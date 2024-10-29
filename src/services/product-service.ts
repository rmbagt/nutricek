import { addProduct, getUserProducts } from "@/actions/product-actions";
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
