import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../lib/api";

export function useResumes(params = {}) {
  const { search = "", minScore = "", sort = "newest" } = params;
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/resumes", { params: { search, minScore, sort } });
      setResumes(data.resumes);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [search, minScore, sort]);

  useEffect(() => {
    load();
  }, [load]);

  return { resumes, loading, reload: load, setResumes };
}
