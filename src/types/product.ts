export interface ClassificationResult {
  name: string;
  category: "food" | "drink";
  details: string;
  grade: "A" | "B" | "C" | "D";
  components: {
    protein: number;
    calories: number;
    fat: number;
    carbs: number;
  };
  ingredients: string[];
}
