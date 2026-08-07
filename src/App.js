import { useState, useEffect, useRef } from 'react'
import './styles/App.css'
import Content from './Content'
import Nav from './Nav'
import Info from './Info'

function RedirectCountdown({ seconds = 3, url = 'https://foo.bar' }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [cancelled, setCancelled] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (cancelled) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          window.location.href = url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [cancelled, url]);

  const handleCancel = () => {
    clearInterval(intervalRef.current);
    setCancelled(true);
  };

  if (cancelled) {
    return <button class="redirect-btn" disabled>Redirect cancelled</button>;
  }

  return (
    <button onClick={handleCancel} class="redirect-btn">
      Redirecting to pngskin v2 in {timeLeft}s — click to cancel
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <Nav />
      <RedirectCountdown seconds={3} url="https://pngskin.udu3324.org" />
      <Content />
      
      <Info />
    </div>
  );
}

export default App