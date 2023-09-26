import { useEffect, useState } from "react";

function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleClassName = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  useEffect(() => {
    const socket = new WebSocket(
      "wss://dev-notification.luxrobo.com/notification/subscriptions",
    );

    socket.addEventListener("open", (event) => {
      console.log("소켓 연결됨");
    });

    socket.addEventListener("close", (event) => {
      console.log("소켓 연결 해제됨");
    });

    socket.addEventListener("message", (event) => {
      console.log("서버로부터의 메시지:", event.data);
      toggleClassName();
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="container" onClick={toggleClassName}>
      header
      <div className={isActive ? "door active" : "door"} id="door1">
        <div className="grid-item-interior">
          <img
            className="inner-background"
            src="/assets/bg.jpg"
            alt="background"
          />
        </div>
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default App;
