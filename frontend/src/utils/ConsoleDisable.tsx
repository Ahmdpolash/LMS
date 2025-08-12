"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function DisableRightClick() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast("Hacker Detected 👀 ", { icon: "⚠️" });
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null;
}
