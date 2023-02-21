import axios from "axios";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [responses, setResponses] = useState([]);

  const handleSubmit = (e) => {
    const newPromp = prompt;
    e.preventDefault();
    setIsWriting(true);
    setPrompt("");
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        setResponses([...responses, newPromp, res.data]);
        setIsWriting(false);
      })

      .catch((err) => {
        setResponses([
          ...responses,
          newPromp,
          "Something went wrong wit the server try again please",
        ]);
        setIsWriting(false);
        console.error(err);
      });
  };

  return (
    <div>
      <div className="answer_container">
        {responses.map((response, index) => (
          <div
            key={index}
            className={
              index % 2 === 0
                ? "message chat-gpt-message"
                : "message my-message"
            }
          >
            {response}
          </div>
        ))}
      </div>

      {isWriting && (
        <div className="writing-message">
          <p className="writing-message-text">Chat GPT is Writing..</p>
          <div className="loader"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="message-box"
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};
export default App;
