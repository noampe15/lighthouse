import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title === "Lighthouse" ? title : `${title} · Lighthouse`;
  }, [title]);
}
