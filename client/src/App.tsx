import { useState, useEffect } from "react";
import "./App.css";

type RespType = {
  fullName: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  gitHub: string;
  picture: string;
}[];

const linkStyle = {
  color: "#999",
  textDecorationStyle: "dotted",
};

function App() {
  const [data, setData] = useState<RespType>([]);

  const fetcher = async () => {
    await fetch("/api/data")
      .then((res) => res.json() as Promise<{ data: RespType }>)
      .then((data) => setData(data.data));
  };
  useEffect(() => {
    fetcher().catch((err) => console.log(err));
  }, []);

  return (
    <main
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#222",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {data && data.length
        ? data.map((teamMember, i) => (
            <div
              key={i}
              style={{
                width: "50%",
                margin: ".5em 0",
                display: "flex",
                flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                fontSize: "min(4vw,1.5em)",
                color: "#6f6f6f",
                justifyContent: "space-around",
              }}
            >
              <img src={teamMember.picture} alt={teamMember.fullName} style={{ height: "10em", borderRadius: "50%" }} />
              <div
                style={{
                  minWidth: "12em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <span>Name: {teamMember.fullName}</span>
                <span>Specialty: {teamMember.role}</span>
                <a
                  href={`mailto:${teamMember.email}?subject=Hi ${teamMember.firstName}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Contact {teamMember.firstName}
                </a>
                <a
                  href={`https://github.com/${teamMember.gitHub}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  {teamMember.firstName}'s Github
                </a>
              </div>
            </div>
          ))
        : null}
    </main>
  );
}

export default App;
