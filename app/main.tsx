"use client";

import { useCallback, useEffect, useState } from "react";
import { ConceptType } from "./types/concept";
import History from "./history";
import Record from "./input";

export default function Main({ concept }: { concept: ConceptType }) {
  const [loading, setLoading] = useState<"" | "user" | "system">("");
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [history, setHistory] = useState<
    {
      role: "user" | "system";
      content: string;
    }[]
  >([]);

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

  const playTTS = useCallback(async (text: string) => {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const { buffer } = await res.json();

    const audio = new Audio(`data:audio/mp3;base64,${buffer}`);
    audio.play();
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
      body: JSON.stringify({ text, history, concept }),
    });

    const { text: response } = await res.json();

    setHistory((history) => [
      ...history,
      {
        role: "system",
        content: response,
      },
    ]);

    setAudioURL("");
    setLoading("");

    playTTS(response);
  }, [audioURL, concept, history, playTTS, stopRecording]);

  return (
    <div className="flex h-full w-full flex-col pb-24">
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