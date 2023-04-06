import { useState } from "react";
import axiosInstance from "./axiosInstance";

export const useGetShowCast = () => {
  const [isPending, setIsPending] = useState(false);

  const getShowCast = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/shows/${id}?embed=cast`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res
        ? { ok: true, data: res.data }
        : { error: "Unable to get show cast" };
    } catch (err) {
      let error = "";
      if (err.response) {
        error = err?.response?.data?.message || "An error occurred.";
      } else if (err.request) {
        error = "Network error. Please try again later.";
      } else {
        error = "An error occurred. Please try again later.";
      }
      return { error };
    } finally {
      setIsPending(false);
    }
  };

  return { getShowCast, isPending };
};
