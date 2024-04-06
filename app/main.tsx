"use client";

import { useCallback, useEffect, useState } from "react";
import History from "./history";
import Record from "./input";
import { ConceptType } from "./types/concept";
import { ChatType } from "./types/chat";
import { BiCaretDown, BiChevronDown } from "react-icons/bi";

export default function Main({ concept }: { concept: ConceptType }) {
  const [loading, setLoading] = useState<"" | "user" | "system">("");
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [history, setHistory] = useState<ChatType[]>([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        setAudioURL(URL.createObjectURL(event.data));
      };
    });
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  }, [mediaRecorder]);

  const playTTS = useCallback(async (grammar: string, response: string) => {
    const [grammarAudio, responseAudio] = await Promise.all(
      [grammar, response].map(async (text) => {
        if (!text) return "";
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        const { buffer } = await res.json();

        return buffer;
      }),
    );

    if (!grammarAudio) {
      const audio = new Audio(`data:audio/mp3;base64,${responseAudio}`);
      audio.play();
      return;
    }
    const audio = new Audio(`data:audio/mp3;base64,${grammarAudio}`);
    audio.play();

    audio.onended = () => {
      const audio = new Audio(`data:audio/mp3;base64,${responseAudio}`);
      audio.play();
    };
  }, []);

  const handleSend = useCallback(async () => {
    stopRecording();

    if (!audioURL) return;
    setLoading("user");
    const formData = new FormData();
    const audioBlob = await fetch(audioURL).then((res) => res.blob());
    formData.append(
      "speech",
      new File([audioBlob], "recording.mp3", { type: "audio/mp3" }),
    );
    formData.append("topic", concept.topic);

    const stt = await fetch("/api/stt", {
      method: "POST",
      body: formData,
    });

    const { text } = await stt.json();

    setHistory((history) => [
      ...history,
      {
        role: "user",
        content: text,
      },
    ]);

    setLoading("system");

    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        history: history.map((h) => ({
          role: h.role,
          content: h.content,
        })),
        concept,
      }),
    });

    const { response, grammar, words } = await res.json();

    setHistory((history) => [
      ...history,
      {
        role: "system",
        content: response,
        grammar,
        words,
      },
    ]);

    setAudioURL("");
    setLoading("");

    playTTS(grammar, response);
  }, [audioURL, concept, history, playTTS, stopRecording]);

  return (
    <div className="flex h-full w-full flex-col pb-24">
      {history.length === 0 && !recording && !audioURL && (
        <div className="fixed inset-x-0 bottom-24 flex w-full flex-col items-center">
          <div className="rounded-full bg-secondary px-8 py-2 text-secondary-content">
            Click Here to Start!
          </div>
          <BiCaretDown size={32} className="text-secondary" />
        </div>
      )}
      <Record
        recording={recording}
        audioURL={audioURL}
        startRecording={startRecording}
        stopRecording={stopRecording}
        handleSend={handleSend}
        loading={loading}
      />
      <History history={history} loading={loading} />
    </div>
  );
}
