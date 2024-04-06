import cc from "classcat";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function History({
  history,
  loading,
}: {
  history: {
    role: "user" | "system";
    content: string;
  }[];
  loading: "" | "user" | "system";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  return (
    <div
      className="no-scrollbar h-full w-full gap-4 overflow-y-auto px-4 py-4"
      ref={ref}
    >
      <div className="flex flex-col justify-end gap-4">
        {history.map((item, index) => (
          <div
            className={cc([
              "chat",
              item.role === "user" ? "chat-end" : "chat-start",
            ])}
            key={index}
          >
            <div
              className={cc([
                "chat-bubble max-w-xl",
                item.role === "user"
                  ? "chat-bubble-primary"
                  : "chat-bubble-secondary",
              ])}
            >
              {item.content}
            </div>
          </div>
        ))}
        {loading !== "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cc([
              "chat",
              loading === "user" ? "chat-end" : "chat-start",
            ])}
          >
            <div
              className={cc([
                "chat-bubble",
                loading === "user"
                  ? "chat-bubble-primary"
                  : "chat-bubble-secondary",
              ])}
            >
              <div className="loading loading-dots" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
