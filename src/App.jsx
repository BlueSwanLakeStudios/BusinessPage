import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage";
import WorkPage from "./components/WorkPage";
import PricingPage from "./components/PricingPage";
import JournalPage from "./components/JournalPage";
import BookingPage from "./components/BookingPage";

const PAGES = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  work: WorkPage,
  pricing: PricingPage,
  journal: JournalPage,
  booking: BookingPage,
};

function readHash() {
  const key = window.location.hash.replace("#/", "").replace("#", "");
  return PAGES[key] ? key : "home";
}

export default function App() {
  const [page, setPage] = useState(readHash);

  useEffect(() => {
    const onHash = () => {
      setPage(readHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (key) => {
    window.location.hash = "#/" + key;
  };

  const Page = PAGES[page];

  return (
    <>
      <Navbar page={page} go={go} />
      <main>
        <Page go={go} />
      </main>
      <Footer go={go} />
    </>
  );
}
