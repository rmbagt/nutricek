import LoadingSkeleton from "@/components/skeleton/loading-skeleton";
import { lazy } from "react";

const CreateArticlePageClient = lazy(() => import("./page.client"));

export default function CreateArticlePage() {
  return <CreateArticlePageClient />;
}
