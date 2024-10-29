export interface ClassificationResult {
  name: string;
  image: string;
  category: string;
  details: string;
  grade: string;
  components: {
    protein: number;
    calories: number;
    fat: number;
    carbs: number;
  };
  ingredients: string[];
}

export interface UserProduct extends ClassificationResult {
  id: string | undefined;
}
