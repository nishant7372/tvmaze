import { useState } from "react";
import axiosInstance from "./axiosInstance";

export const useGetStarred = () => {
  const [isPending, setIsPending] = useState(false);

  const getStarred = async () => {
    setIsPending(true);
    try {
      let items = JSON.parse(localStorage.getItem("items"));
      let shows = [];
      if (items !== null) {
        for (let i = 0; i < items.length; i++) {
          let res = await axiosInstance.get(`/shows/${items[i]}`, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          if (res) {
            shows.push(res);
          }
        }
      }
      return { ok: true, data: shows };
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

  return { getStarred, isPending };
};
