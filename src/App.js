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
            <Articles />
            <Footer />
        </div>
    );
}

export default App;
