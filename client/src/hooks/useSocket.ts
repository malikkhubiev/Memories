import { useCallback, useEffect, useRef, useState } from "react";

type socketType = "images" | "comments" | "chats";

const useSocket = (type: socketType, imageId?: number) => {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket("wss://memories-3-ov6w.onrender.com/");
      // ws.current = new WebSocket("ws://localhost:5000/");
      ws.current.onopen = () => {
        ws.current.send(
          JSON.stringify({
            token: localStorage.getItem("token"),
            type,
            imageId,
            method: "connection",
          }),
        );
        setStatus("Соединение открыто");
      };
      ws.current.onclose = () => setStatus("Соединение закрыто");

      gettingData();
    }

    return () => ws.current.close();
  }, [ws, isPaused]);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e: any) => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      setData(message);
    };
  }, [isPaused]);

  const sendData = (data: { type: socketType; body: any }) => {
    if (!ws.current || status !== "Соединение открыто") return;

    ws.current.send(
      JSON.stringify({
        token: localStorage.getItem("token"),
        method: "message",
        data,
      }),
    );
  };

  return { data, sendData };
};

export default useSocket;
