import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Headphones,
  MapPin,
  Menu,
  Navigation,
  Plane,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/oyo-rides-hero_854ffde8.png";
const airportImage = "/manus-storage/oyo-rides-airport_3b99d9e8.png";
const cityImage = "/manus-storage/oyo-rides-city_0e4fa707.png";
const stationImage = "/manus-storage/oyo-rides-station_0e8f4e42.png";
const markImage = "/manus-storage/iyi-rides-mark_bc9983c7.png";

const rideTypes = [
  { id: "airport", label: "Airport pickup", icon: Plane, detail: "Meet-and-greet at the terminal" },
  { id: "station", label: "Station transfer", icon: TrainFront, detail: "From platform to front door" },
  { id: "local", label: "Local ride", icon: Navigation, detail: "Point-to-point, when you need it" },
];

const options = [
  { name: "Comfort sedan", meta: "Up to 3 guests · 2 bags", price: "₹549", tone: "teal", icon: CarFront },
  { name: "Premium sedan", meta: "Up to 4 guests · 3 bags", price: "₹799", tone: "red", icon: Sparkles },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rideType, setRideType] = useState("airport");
  const [pickup, setPickup] = useState("Kempegowda International Airport");
  const [drop, setDrop] = useState("IYI Stay, Indiranagar");
  const [date, setDate] = useState("Tue, 02 Sep");
  const [time, setTime] = useState("08:30 AM");
  const [selectedOption, setSelectedOption] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentRide = rideTypes.find((ride) => ride.id === rideType) ?? rideTypes[0];

  function handleSearch() {
    if (!pickup || !drop) {
      toast.error("Add a pickup and destination to see available rides.");
      return;
    }
    setShowResults(true);
    setTimeout(() => document.getElementById("ride-options")?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    toast.success("A few dependable rides are ready to compare.");
  }

  function handleBook() {
    toast.success("Your ride is reserved for this prototype.", { description: `${currentRide.label} · ${date} at ${time}` });
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand-lockup" onClick={() => scrollToId("top")} aria-label="IYI Rides home">
            <img src={markImage} alt="" className="brand-mark" />
            <span><b>IYI</b> <em>RIDES</em></span>
          </button>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            <button onClick={() => { scrollToId("how-it-works"); setMenuOpen(false); }}>How it works</button>
            <button onClick={() => { scrollToId("ride-options"); setMenuOpen(false); }}>Ride types</button>
            <button onClick={() => { scrollToId("safety"); setMenuOpen(false); }}>Safety</button>
            <button onClick={() => { toast.info("Help centre is coming soon."); setMenuOpen(false); }}>Help centre</button>
          </nav>
          <div className="topbar-actions">
            <button className="ghost-button desktop-only" onClick={() => toast.info("Sign in is coming soon.")}>Sign in</button>
            <button className="icon-button mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
            <button className="compact-cta desktop-only" onClick={() => scrollToId("book")}>Book a ride <ArrowRight size={15} /></button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-art" style={{ backgroundImage: `url(${heroImage})` }} aria-label="Cab arriving at a hotel in the rain" role="img">
            <div className="hero-art-wash" />
            <div className="route-stamp"><span className="stamp-dot" /> ARRIVE WELL <span className="stamp-line" /> IYI 01</div>
          </div>
          <div className="hero-content page-width">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> THE ROOM IS BOOKED. THE WAY THERE IS TOO.</div>
              <h1>Arrive with<br /><i>one less thing</i><br />to figure out.</h1>
              <p>Dependable cabs for the moments around your stay. Airport pickups, station transfers, and city rides—booked right where your room lives.</p>
              <div className="hero-trust"><span><ShieldCheck size={16} /> Clear fares</span><span><Clock3 size={16} /> On-time focus</span></div>
            </div>
            <div className="booking-card" id="book">
              <div className="booking-heading"><div><span className="section-kicker">PLAN YOUR ARRIVAL</span><h2>Where are you headed?</h2></div><span className="booking-number">01<span>/03</span></span></div>
              <div className="ride-tabs" role="tablist" aria-label="Ride type">
                {rideTypes.map((ride) => { const Icon = ride.icon; return <button key={ride.id} className={rideType === ride.id ? "active" : ""} onClick={() => setRideType(ride.id)} role="tab" aria-selected={rideType === ride.id}><Icon size={17} /><span>{ride.label}</span></button>; })}
              </div>
              <div className="location-fields">
                <label className="field-row"><span className="field-icon pickup-icon"><MapPin size={16} /></span><span className="field-copy"><small>Pick up from</small><input value={pickup} onChange={(e) => setPickup(e.target.value)} aria-label="Pickup location" /></span><ChevronDown size={15} className="field-chevron" /></label>
                <div className="field-connector" />
                <label className="field-row"><span className="field-icon drop-icon"><MapPin size={16} /></span><span className="field-copy"><small>Drop off at</small><input value={drop} onChange={(e) => setDrop(e.target.value)} aria-label="Drop off location" /></span><ChevronDown size={15} className="field-chevron" /></label>
              </div>
              <div className="booking-grid">
                <label className="mini-field"><CalendarDays size={16} /><span><small>Date</small><input value={date} onChange={(e) => setDate(e.target.value)} aria-label="Ride date" /></span></label>
                <label className="mini-field"><Clock3 size={16} /><span><small>Pickup time</small><input value={time} onChange={(e) => setTime(e.target.value)} aria-label="Pickup time" /></span></label>
              </div>
              <button className="primary-button wide" onClick={handleSearch}>See available rides <ArrowRight size={17} /></button>
              <p className="fine-print"><ShieldCheck size={13} /> You’ll see your fare before you confirm.</p>
            </div>
          </div>
          <div className="hero-bottom-note page-width"><span>BUILT AROUND YOUR STAY</span><span className="scroll-note"><span className="scroll-line" /> Scroll to explore</span></div>
        </section>

        <section className="journey-intro page-width" id="how-it-works">
          <div className="route-rail"><span className="rail-line" /><span className="rail-node active">01</span><span className="rail-node">02</span><span className="rail-node">03</span></div>
          <div className="intro-copy"><span className="section-kicker">YOUR STAY, CONNECTED</span><h2>From front door<br />to <i>front desk.</i></h2><p>Good travel has a rhythm. We keep the handoffs simple, so the journey from a platform, terminal, or street corner feels like part of the stay—not a separate thing to solve.</p></div>
          <div className="intro-aside"><div className="aside-rule" /><p>One place to book, follow, and get help with the ride around your IYI stay.</p><button className="text-link" onClick={() => scrollToId("safety")}>Why guests choose it <ArrowRight size={16} /></button></div>
        </section>

        <section className="story-band page-width">
          <div className="story-image image-frame" style={{ backgroundImage: `url(${airportImage})` }}><span className="image-label">01 / AIRPORT PICKUP</span></div>
          <div className="story-copy"><span className="section-kicker">THE FIRST TEN MINUTES MATTER</span><h3>Land. Locate.<br /><i>Let us handle the rest.</i></h3><p>Your hotel details can already be in the journey. Add a flight or pickup note, and get clear instructions for the handoff.</p><button className="outline-button" onClick={() => { setRideType("airport"); scrollToId("book"); }}>Plan an airport pickup <ArrowRight size={16} /></button></div>
        </section>

        <section className="options-section" id="ride-options">
          <div className="page-width options-header"><div><span className="section-kicker">CHOOSE YOUR PACE</span><h2>A ride for the<br /><i>moment you’re in.</i></h2></div><div className="options-intro"><p>Every option is shown with the details that matter: vehicle, capacity, provider, and the price before you confirm.</p><button className="text-link" onClick={() => toast.info("More vehicle categories are coming soon.")}>View all options <ArrowRight size={16} /></button></div></div>
          <div className="page-width option-grid">
            {options.map((option, index) => { const Icon = option.icon; return <button className={`option-card ${selectedOption === index ? "selected" : ""}`} key={option.name} onClick={() => { setSelectedOption(index); setShowResults(true); }}><div className={`option-icon ${option.tone}`}><Icon size={22} /></div><div className="option-card-text"><span className="option-label">{index === 0 ? "MOST POPULAR" : "A LITTLE MORE ROOM"}</span><h3>{option.name}</h3><p>{option.meta}</p></div><div className="option-price"><strong>{option.price}</strong><span>estimated</span></div><span className="option-check">{selectedOption === index ? <Check size={14} /> : <ArrowRight size={16} />}</span></button>; })}
          </div>
          {showResults && <div className="page-width results-note"><span className="status-pulse" /> Showing availability for <b>{currentRide.label.toLowerCase()}</b> · {date} at {time}<button onClick={handleBook}>Reserve this ride <ArrowRight size={15} /></button></div>}
        </section>

        <section className="split-stories page-width">
          <div className="split-story"><div className="image-frame small" style={{ backgroundImage: `url(${cityImage})` }}><span className="image-label">02 / LOCAL RIDES</span></div><span className="section-kicker">MAKE ROOM FOR THE CITY</span><h3>Go where the<br /><i>good parts are.</i></h3><p>From hotel to dinner, meeting to market, book the next stop without losing the thread of your stay.</p><button className="text-link" onClick={() => { setRideType("local"); scrollToId("book"); }}>Book a local ride <ArrowRight size={16} /></button></div>
          <div className="split-story offset"><div className="image-frame small" style={{ backgroundImage: `url(${stationImage})` }}><span className="image-label">03 / STATION TRANSFER</span></div><span className="section-kicker">THE LAST LEG, MADE EASY</span><h3>Platform to<br /><i>pillow.</i></h3><p>For the bags, the late arrivals, and the moments when a little certainty goes a long way.</p><button className="text-link" onClick={() => { setRideType("station"); scrollToId("book"); }}>Plan a station transfer <ArrowRight size={16} /></button></div>
        </section>

        <section className="safety-section" id="safety">
          <div className="page-width safety-inner"><div className="safety-copy"><span className="section-kicker light">THE IYI STANDARD</span><h2>Useful details.<br /><i>Quiet confidence.</i></h2><p>We keep the important things close: transparent pricing, clear pickup guidance, and support when plans change.</p><button className="light-button" onClick={() => toast.info("Ride support is available in the full IYI Rides app.")}>Explore safety & support <ArrowRight size={16} /></button></div><div className="safety-list"><div className="safety-item"><span className="safety-number">01</span><div><h3>Know before you go</h3><p>Fare, vehicle capacity, and cancellation terms are shown before confirmation.</p></div></div><div className="safety-item"><span className="safety-number">02</span><div><h3>Follow the handoff</h3><p>Pickup notes, driver details, and ride status stay in one trip view.</p></div></div><div className="safety-item"><span className="safety-number">03</span><div><h3>Help is part of the ride</h3><p>Get ride-specific support for delays, no-shows, changes, and safety concerns.</p></div></div></div></div>
        </section>

        <section className="final-cta page-width"><div className="cta-route"><span className="route-dot" /><span className="route-dash" /><span className="route-dot end" /></div><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Your stay starts<br /><i>before check-in.</i></h2></div><button className="primary-button" onClick={() => scrollToId("book")}>Plan my pickup <ArrowRight size={17} /></button></section>
      </main>

      <footer className="footer"><div className="page-width footer-inner"><div className="brand-lockup footer-brand"><img src={markImage} alt="" className="brand-mark" /><span><b>IYI</b> <em>RIDES</em></span><p>One less thing to figure out<br />around your stay.</p></div><div className="footer-links"><div><span>EXPLORE</span><button onClick={() => scrollToId("how-it-works")}>How it works</button><button onClick={() => scrollToId("ride-options")}>Ride types</button></div><div><span>NEED A HAND?</span><button onClick={() => toast.info("Help centre is coming soon.")}>Help centre</button><button onClick={() => toast.info("Terms are coming soon.")}>Terms & privacy</button></div></div><div className="footer-meta"><span><Headphones size={16} /> Support, when it matters</span><small>© 2026 IYI Rides concept</small></div></div></footer>
    </div>
  );
}
