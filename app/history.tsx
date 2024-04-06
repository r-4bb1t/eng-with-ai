import cc from "classcat";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChatType } from "./types/chat";

export default function History({
  history,
  loading,
}: {
  history: ChatType[];
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
  }, [history, loading]);

  return (
    <div
      className="no-scrollbar h-full w-full gap-4 overflow-y-auto px-4 py-4"
      ref={ref}
    >
      <div className="flex flex-col justify-end gap-4">
        {history.map((item, index) => (
          <div key={index}>
            <div
              className={cc([
                "chat",
                item.role === "user" ? "chat-end" : "chat-start",
              ])}
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
            {item.grammar && (
              <div className="ml-3 rounded bg-base-200 px-2 py-1 text-sm font-medium text-base-content">
                {item.grammar}
              </div>
            )}
            {item.words && (
              <div className="ml-3 mt-2 flex flex-wrap gap-2">
                {item.words.map((word, index) => (
                  <div key={index} className="badge badge-primary font-bold">
                    {word.word}{" "}
                    <span className="ml-1 font-light">{word.meaning}</span>
                  </div>
                ))}
              </div>
            )}
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
