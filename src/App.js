import { Routes, Route } from "react-router-dom";
import "./App.css";
import Article from "./components/Article";
import Articles from "./components/Articles";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import { UserProvider } from "./contexts/UserProvider";

function App() {
    return (
        <div className="App">
            <Logo />
            <UserProvider>
                <Nav />
                <Routes>
                    <Route path="/" element={<Articles />} />
                    <Route path="/topics/:topic_id" element={<Articles />} />
                    <Route path="/articles/:article_id" element={<Article />} />
                    <Route path="/user/login" element={<Login />} />
                </Routes>
            </UserProvider>
            <Footer />
        </div>
    );
}

export default App;
