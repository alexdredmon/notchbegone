import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <img
          alt="Notch Be Gone"
          className="AppLogo"
          src="/img/logo.png"
        />
        <img
          className="AppTitle"
          src="/img/title.png"
          alt="Free notchless background generator"
        />
      </header>
      <img
        className="AppDemo"
        src="/img/demo.png"
        alt=""
      />
      <button
        className="UploadButton"
        onClick={() => alert('Coming soon!')}
      ></button>
    </div>
  );
}

export default App;
