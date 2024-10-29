"use client";

import { ClassificationResult } from "@/types/product";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

export default function Result({
  classificationResult,
  onClose,
}: {
  classificationResult: ClassificationResult;
  onClose: () => void;
}) {
  const [readMore, setReadMore] = React.useState(false);

  if (!classificationResult || Object.keys(classificationResult).length === 0) {
    return (
      <div className="h-[calc(100vh-2rem)] overflow-y-auto p-4">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="h-6 w-6 text-gray-500" />
        </button>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center">
            <h2 className="mt-4 text-4xl font-bold">No Result</h2>
          </div>
          <p className="text-lg text-gray-600">
            Image is neither food or drink products, or maybe there is an error
            with our classifier 🤖
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-2rem)] overflow-y-auto p-4">
      <button onClick={onClose} className="absolute right-4 top-4">
        <X className="h-6 w-6 text-gray-500" />
      </button>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mt-4 text-4xl font-bold">
          Grade:{" "}
          <span className="text-green-500">{classificationResult.grade}</span>
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold text-rose-400">Protein</p>
          <p className="text-2xl font-bold">
            {classificationResult.components.protein}g
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-rose-400">Calories</p>
          <p className="text-2xl font-bold">
            {classificationResult.components.calories}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-rose-400">Fat</p>
          <p className="text-2xl font-bold">
            {classificationResult.components.fat}g
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-rose-400">Carbs</p>
          <p className="text-2xl font-bold">
            {classificationResult.components.carbs}g
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Details</h3>
        <p className="mt-2 text-gray-600">
          {readMore
            ? classificationResult.details
            : `${classificationResult.details.slice(0, 150)}...`}{" "}
          <span
            className="cursor-pointer text-green-500"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Read Less" : "Read More"}
          </span>
        </p>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Ingredients</h3>
        <p className="mt-2 text-gray-600">
          {classificationResult.ingredients.join(", ")}
        </p>
      </div>
      <Button
        className="mt-8 w-full bg-green-500 text-lg font-semibold text-white transition-colors duration-200 hover:bg-green-700"
        onClick={() => {}}
      >
        Add to Favorites
      </Button>
    </div>
  );
}
