import { Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import Nav from "./components/Nav";

function App() {
    return (
        <div className="App">
            <Logo />
            <Nav />
            <Routes>
                <Route path="/" element={<Articles />} />
                <Route path="/topics/:topic_id" element={<Articles />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
