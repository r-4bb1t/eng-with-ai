import { FiSend, FiMic, FiMicOff } from "react-icons/fi";

export default function Record({
  recording,
  audioURL,
  startRecording,
  stopRecording,
  handleSend,
  loading,
}: {
  recording: boolean;
  audioURL: string;
  startRecording: () => void;
  stopRecording: () => void;
  handleSend: () => void;
  loading: "" | "user" | "system";
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 flex h-24 w-full items-center justify-center bg-base-200">
      <button
        onClick={
          audioURL ? handleSend : recording ? stopRecording : startRecording
        }
        className="btn btn-circle btn-primary btn-lg"
        disabled={loading !== ""}
      >
        {audioURL ? (
          <FiSend />
        ) : recording ? (
          <div className="loading loading-bars" />
        ) : (
          <FiMic />
        )}
      </button>
    </div>
  );
}
