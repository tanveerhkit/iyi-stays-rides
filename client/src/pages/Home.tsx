/* IYI app experience: screenshot-matched hot-pink chrome, soft hospitality surfaces, compact mobile-first cards, and a rides journey that feels native to booking. */
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bike,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  Hotel,
  MapPin,
  Menu,
  Navigation,
  Plane,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrainFront,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type Screen = "home" | "search" | "rides" | "bookings" | "wallet";
type Sheet = "booking" | "hotel" | "ride-confirm" | "menu" | null;

type HotelCard = {
  id: string;
  name: string;
  area: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: string;
  distance: string;
  image: string;
};

const heroImage = "/manus-storage/oyo-rides-hero_854ffde8.png";
const hotelImageOne = "/manus-storage/oyo-rides-city_0e4fa707.png";
const hotelImageTwo = "/manus-storage/oyo-rides-station_0e8f4e42.png";
const rideImage = "/manus-storage/iyi-rides-ride-card_7952f6fb.png";
const markImage = "/manus-storage/iyi-rides-mark_bc9983c7.png";

const cities = [
  { name: "Lucknow", image: hotelImageOne },
  { name: "Delhi", image: hotelImageTwo },
  { name: "Kanpur", image: hotelImageOne },
  { name: "Varanasi", image: hotelImageTwo },
];

const hotels: HotelCard[] = [
  { id: "geetraj", name: "IYI Lavish Hotel Geetraj", area: "Barrow Complex near Alambagh Bus Stand", price: "₹999", oldPrice: "₹3000", discount: "67% OFF", rating: "4.8", distance: "73.9 km", image: heroImage },
  { id: "tehzeeb", name: "IYI Lavish The Tehzeeb Living", area: "Shaheed Path, Lucknow", price: "₹999", oldPrice: "₹2000", discount: "50% OFF", rating: "4.6", distance: "81.5 km", image: hotelImageTwo },
  { id: "sawanriya", name: "IYI Splendid Hotel Sanwariya", area: "Pandarbiba, Lucknow", price: "₹599", oldPrice: "₹1600", discount: "63% OFF", rating: "4.7", distance: "68.4 km", image: hotelImageOne },
];

const rideTypes = [
  { id: "airport", label: "Airport", detail: "Meet & greet at terminal", icon: Plane },
  { id: "station", label: "Station", detail: "Platform to front door", icon: TrainFront },
  { id: "local", label: "Local ride", detail: "Point-to-point city travel", icon: Navigation },
];

const rideOptions = [
  { id: "comfort", label: "Comfort Sedan", detail: "Up to 3 guests · 2 bags", price: "₹549", eta: "4 min", icon: CarFront, tag: "Most popular" },
  { id: "premium", label: "Premium Sedan", detail: "Up to 4 guests · 3 bags", price: "₹799", eta: "7 min", icon: Sparkles, tag: "Extra room" },
  { id: "bike", label: "Quick Bike", detail: "1 guest · light luggage", price: "₹249", eta: "3 min", icon: Bike, tag: "Lowest fare" },
];

const filters = ["Nearby", "Top Rated", "Price – Low to High", "Price – High to Low"];

function AppMark({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`app-mark ${dark ? "dark" : ""}`}>
      <img src={markImage} alt="" />
      <span><b>iYi</b><small>STAYS + RIDES</small></span>
    </div>
  );
}

function TopChrome({ onMenu, onWallet }: { onMenu: () => void; onWallet: () => void }) {
  return (
    <div className="top-chrome">
      <button className="chrome-icon" onClick={onMenu} aria-label="Open menu"><Menu size={22} /></button>
      <AppMark />
      <div className="chrome-actions">
        <button className="wallet-pill" onClick={onWallet} aria-label="Open wallet"><WalletCards size={20} /><span>₹0</span></button>
        <button className="chrome-icon" onClick={() => toast.info("Notifications are quiet for now.")} aria-label="Notifications"><Bell size={21} /></button>
      </div>
    </div>
  );
}

function BottomNav({ screen, onNavigate }: { screen: Screen; onNavigate: (screen: Screen) => void }) {
  const items: { id: Screen; label: string; icon: typeof Hotel }[] = [
    { id: "home", label: "Home", icon: Hotel },
    { id: "rides", label: "Rides", icon: CarFront },
    { id: "search", label: "Search", icon: Search },
    { id: "bookings", label: "Bookings", icon: CalendarDays },
    { id: "wallet", label: "Wallet", icon: WalletCards },
  ];
  return (
    <nav className="bottom-nav" aria-label="App navigation">
      {items.map(({ id, label, icon: Icon }) => (
        <button key={id} className={screen === id ? "active" : ""} onClick={() => onNavigate(id)}>
          <Icon size={21} strokeWidth={screen === id ? 2.4 : 1.8} /><span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function CityRail({ selectedCity, onCity }: { selectedCity: string; onCity: (name: string) => void }) {
  return (
    <div className="city-rail" aria-label="Popular cities">
      {cities.map((city) => (
        <button key={city.name} className={selectedCity === city.name ? "active" : ""} onClick={() => onCity(city.name)}>
          <img src={city.image} alt="" />
          <span>{city.name}</span>
        </button>
      ))}
    </div>
  );
}

function HotelCardView({ hotel, onOpen, onFavorite }: { hotel: HotelCard; onOpen: () => void; onFavorite: () => void }) {
  return (
    <article className="hotel-card">
      <button className="hotel-image-button" onClick={onOpen} aria-label={`View ${hotel.name}`}>
        <img src={hotel.image} alt={`${hotel.name} room`} />
        <span className="discount-badge">{hotel.discount}</span>
      </button>
      <button className="heart-button" onClick={onFavorite} aria-label={`Save ${hotel.name}`}><Heart size={18} /></button>
      <button className="hotel-copy" onClick={onOpen}>
        <div className="hotel-title-row"><h3>{hotel.name}</h3><span className="hotel-price"><s>{hotel.oldPrice}</s> <b>{hotel.price}</b></span></div>
        <p>{hotel.area}</p>
        <div className="hotel-meta"><span><Star size={15} fill="currentColor" /> {hotel.rating}</span><span><Navigation size={15} /> {hotel.distance}</span><span className="pay-hotel"><WalletCards size={15} /> Pay at hotel</span></div>
      </button>
    </article>
  );
}

function HomeScreen({
  selectedCity,
  onCity,
  onOpenHotel,
  onFavorite,
  onGoRides,
}: {
  selectedCity: string;
  onCity: (name: string) => void;
  onOpenHotel: (hotel: HotelCard) => void;
  onFavorite: (hotel: HotelCard) => void;
  onGoRides: () => void;
}) {
  return (
    <div className="screen home-screen">
      <section className="pink-hero">
        <div className="hero-topspace" />
        <div className="mode-toggle"><button className="selected">Normal</button><button>Premium</button></div>
        <CityRail selectedCity={selectedCity} onCity={onCity} />
        <div className="hero-search-row">
          <button className="nearby-button" onClick={() => toast.success("Using your current location for nearby stays.")}><Navigation size={19} fill="currentColor" /> Nearby</button>
          <button className="city-search" onClick={() => toast.info("Type a city in the search screen.")}><span>Tap to search cities...</span><Search size={22} /></button>
        </div>
      </section>
      <section className="home-body">
        <div className="section-heading"><div><span className="eyebrow-pink">RECOMMENDED FOR YOU</span><h1>Stay easy.<br /><i>Move easy.</i></h1></div><button className="arrow-square" onClick={() => toast.info("More curated stays are coming soon.")}><ArrowRight size={20} /></button></div>
        <button className="ride-discovery-card" onClick={onGoRides}>
          <div className="ride-card-image"><img src={rideImage} alt="White sedan waiting at an airport" /><span className="live-chip"><span /> Live pickup</span></div>
          <div className="ride-card-copy"><span className="eyebrow-pink">NEW FROM IYI</span><h2>Book the ride<br /><i>around your stay.</i></h2><p>Airport pickups, station transfers, and local cabs—one simple handoff.</p><span className="ride-card-link">Explore rides <ArrowRight size={16} /></span></div>
        </button>
        <div className="list-heading"><h2>Nearby stays</h2><button onClick={() => toast.info("All stay results are coming soon.")}>View all <ArrowRight size={15} /></button></div>
        <div className="filter-row">{filters.map((filter, index) => <button key={filter} className={index === 0 ? "selected" : ""} onClick={() => toast.success(`${filter} filter selected.`)}>{filter}</button>)}</div>
        <div className="hotel-list">{hotels.slice(0, 2).map((hotel) => <HotelCardView key={hotel.id} hotel={hotel} onOpen={() => onOpenHotel(hotel)} onFavorite={() => onFavorite(hotel)} />)}</div>
      </section>
    </div>
  );
}

function SearchScreen({ onOpenHotel }: { onOpenHotel: (hotel: HotelCard) => void }) {
  const [query, setQuery] = useState("Lucknow");
  const [activeFilter, setActiveFilter] = useState("Nearby");
  const filteredHotels = useMemo(() => hotels.filter((hotel) => `${hotel.name} ${hotel.area}`.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes("lucknow")), [query]);
  return (
    <div className="screen search-screen">
      <div className="search-head"><button className="round-light" onClick={() => toast.info("Back to home") }><ArrowLeft size={20} /></button><label className="full-search"><input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search city" /><Search size={20} /></label></div>
      <div className="search-tabs">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? "selected" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
      <div className="stay-switch"><button className="selected">Hourly rooms</button><button onClick={() => toast.info("Overnight rooms filter selected.")}>Overnight rooms <CalendarDays size={15} /></button></div>
      <div className="search-heading"><div><span className="eyebrow-pink">{filteredHotels.length} STAYS NEAR YOU</span><h1>Find a room<br /><i>for right now.</i></h1></div><span className="search-sort">{activeFilter}</span></div>
      <div className="hotel-list search-results">{(filteredHotels.length ? filteredHotels : hotels).map((hotel) => <HotelCardView key={hotel.id} hotel={hotel} onOpen={() => onOpenHotel(hotel)} onFavorite={() => toast.success("Saved to wishlist.")} />)}</div>
    </div>
  );
}

function RidesScreen({ onConfirm }: { onConfirm: (ride: typeof rideOptions[number], rideType: string, pickup: string, dropoff: string) => void }) {
  const [rideType, setRideType] = useState("airport");
  const [pickup, setPickup] = useState("Lucknow Airport · Terminal 2");
  const [dropoff, setDropoff] = useState("IYI Lavish Hotel Geetraj");
  const [date, setDate] = useState("Tue, 02 Sep");
  const [time, setTime] = useState("08:30 AM");
  const [activeOption, setActiveOption] = useState("comfort");
  const [passengers, setPassengers] = useState(1);
  const [bags, setBags] = useState(1);
  const [rideSearched, setRideSearched] = useState(false);
  const activeRide = rideOptions.find((ride) => ride.id === activeOption) ?? rideOptions[0];
  return (
    <div className="screen rides-screen">
      <div className="rides-hero">
        <div className="rides-title-row"><div><span className="eyebrow-light">IYI MOBILITY</span><h1>Where are you<br /><i>headed?</i></h1></div><div className="ride-status">01 <span>/ 03</span></div></div>
        <div className="ride-tabs">{rideTypes.map(({ id, label, icon: Icon }) => <button key={id} className={rideType === id ? "selected" : ""} onClick={() => setRideType(id)}><Icon size={16} /><span>{label}</span></button>)}</div>
        <div className="route-form">
          <label><span className="route-pin pickup"><MapPin size={16} /></span><span><small>Pick up from</small><input value={pickup} onChange={(e) => setPickup(e.target.value)} /></span><ChevronDown size={16} /></label>
          <div className="route-dots" />
          <label><span className="route-pin drop"><MapPin size={16} /></span><span><small>Drop off at</small><input value={dropoff} onChange={(e) => setDropoff(e.target.value)} /></span><ChevronDown size={16} /></label>
        </div>
        <div className="ride-date-grid"><label><CalendarDays size={17} /><span><small>Pickup date</small><input value={date} onChange={(e) => setDate(e.target.value)} /></span></label><label><Clock3 size={17} /><span><small>Pickup time</small><input value={time} onChange={(e) => setTime(e.target.value)} /></span></label></div>
        <button className="primary-cta" onClick={() => { setRideSearched(true); toast.success("Rides found for your journey."); }}><Search size={18} /> Find available rides <ArrowRight size={17} /></button>
      </div>
      <section className="rides-body">
        <div className="map-preview"><div className="map-label"><Navigation size={14} /> Your route preview</div><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-route"><span className="map-dot start" /><span className="map-dash" /><span className="map-dot end" /></div><span className="map-place airport-label">Airport</span><span className="map-place hotel-label">IYI Stay</span><button className="map-recenter" onClick={() => toast.success("Route centered.")}><Navigation size={16} /></button></div>
        <div className="ride-results-head"><div><span className="eyebrow-pink">{rideSearched ? "AVAILABLE NOW" : "SUGGESTED FOR YOUR STAY"}</span><h2>Choose your <i>ride.</i></h2></div><span className="ride-result-count">3 options</span></div>
        <div className="ride-option-list">{rideOptions.map((ride) => { const Icon = ride.icon; return <button className={`ride-option ${activeOption === ride.id ? "selected" : ""}`} key={ride.id} onClick={() => setActiveOption(ride.id)}><span className="ride-option-icon"><Icon size={22} /></span><span className="ride-option-copy"><small>{ride.tag}</small><strong>{ride.label}</strong><span>{ride.detail} · {ride.eta} away</span></span><span className="ride-option-price"><b>{ride.price}</b><small>estimated</small></span><span className="ride-check">{activeOption === ride.id ? <Check size={14} /> : <ChevronRight size={18} />}</span></button>; })}</div>
        <div className="passenger-panel"><div><span className="eyebrow-pink">TRIP DETAILS</span><h3>Who is riding?</h3></div><div className="counter-row"><Counter label="Guests" value={passengers} onDecrease={() => setPassengers(Math.max(1, passengers - 1))} onIncrease={() => setPassengers(passengers + 1)} /><Counter label="Bags" value={bags} onDecrease={() => setBags(Math.max(0, bags - 1))} onIncrease={() => setBags(bags + 1)} /></div></div>
        <div className="safety-strip"><ShieldCheck size={19} /><span><b>Ride with confidence</b> · Clear fares, verified providers, and support when plans change.</span></div>
        <button className="confirm-ride-button" onClick={() => onConfirm(activeRide, rideType, pickup, dropoff)}>Continue with {activeRide.label} <span>{activeRide.price}</span><ArrowRight size={18} /></button>
      </section>
    </div>
  );
}

function Counter({ label, value, onDecrease, onIncrease }: { label: string; value: number; onDecrease: () => void; onIncrease: () => void }) {
  return <div className="counter"><span>{label}</span><div><button onClick={onDecrease} aria-label={`Decrease ${label}`}><span>−</span></button><b>{String(value).padStart(2, "0")}</b><button onClick={onIncrease} aria-label={`Increase ${label}`}><Plus size={15} /></button></div></div>;
}

function HotelDetailSheet({ hotel, onClose, onBook, onAddRide }: { hotel: HotelCard; onClose: () => void; onBook: () => void; onAddRide: () => void }) {
  return <div className="sheet-backdrop"><section className="detail-sheet"><div className="sheet-grabber" /><div className="detail-image"><img src={hotel.image} alt={`${hotel.name} room`} /><button className="sheet-close" onClick={onClose}><X size={20} /></button><button className="sheet-back" onClick={onClose}><ArrowLeft size={20} /></button><span className="photo-count">1 / 25</span></div><div className="detail-body"><div className="detail-title-row"><div><h2>{hotel.name}</h2><p><MapPin size={16} /> {hotel.area}</p></div><span className="rating-pill"><Star size={14} fill="currentColor" /> {hotel.rating} <small>(99)</small></span></div><button className="view-map-link" onClick={() => toast.success("Map view opened.")}><Navigation size={15} /> {hotel.distance} from you · View on map</button><div className="room-tabs"><button className="selected">Hourly</button><button onClick={() => toast.info("Full-day rooms selected.")}>Full-day</button></div><div className="detail-price"><div><s>{hotel.oldPrice}</s><span className="discount-soft">{hotel.discount}</span><strong>{hotel.price}<small> / hour</small></strong></div><span>Tax included<br /><b>HURRY! ONLY 3 LEFT</b></span></div><div className="duration-row"><span>Stay duration</span><div><button className="selected">2h</button><button onClick={() => toast.info("4-hour duration selected.")}>4h</button><button onClick={() => toast.info("6-hour duration selected.")}>6h</button></div></div><h3 className="subhead">Select room type</h3><button className="room-type-row" onClick={() => toast.success("Deluxe room selected.")}><span>Deluxe Rooms</span><Check size={17} /></button><div className="stay-ride-prompt"><div className="stay-ride-icon"><CarFront size={20} /></div><div><span className="eyebrow-pink">MAKE IT A SEAMLESS ARRIVAL</span><b>Add a ride to this stay</b><small>Airport, station, or local pickup—review it with your room.</small></div><button onClick={onAddRide} aria-label="Add a ride to this stay"><Plus size={17} /></button></div><h3 className="subhead">Policies & guidelines</h3><div className="policy-panel"><div><small>CHECK-IN</small><b>12:00 PM</b></div><div><small>CHECK-OUT</small><b>11:00 AM</b></div><p>Free cancellation up to 24h before check-in.</p></div><h3 className="subhead">Hotel amenities</h3><div className="amenities"><span>❄<small>AC</small></span><span>▣<small>TV</small></span><span>⌁<small>WiFi</small></span><span>✦<small>Power backup</small></span></div></div><div className="sticky-book-bar"><div><strong>{hotel.price}</strong><small>Tax included · 1 room, 1 adult</small></div><button onClick={onBook}>Book now <ArrowRight size={18} /></button></div></section></div>;
}

function BookingSheet({ onClose, onConfirm, withRide = false }: { onClose: () => void; onConfirm: (withRide: boolean) => void; withRide?: boolean }) {
  const [duration, setDuration] = useState("2h");
  const [coupon, setCoupon] = useState("");
  const [addRide, setAddRide] = useState(withRide);
  return <div className="sheet-backdrop"><section className="booking-sheet"><div className="sheet-grabber" /><div className="booking-sheet-scroll"><div className="booking-sheet-head"><h2>Complete your booking</h2><button className="sheet-close" onClick={onClose}><X size={20} /></button></div><div className="booking-room-row"><span className="room-thumb" /><span><b>Deluxe Rooms</b><small>Tax included in price</small></span><Check size={17} /></div><div className="booking-toggle"><button className="selected">Hourly</button><button>Full day</button></div><div className="booking-date"><CalendarDays size={18} /><span><small>Date & time</small><b>23 Jul, 02:00 AM</b></span></div><h3>Stay duration</h3><div className="duration-row compact"><div><button className={duration === "2h" ? "selected" : ""} onClick={() => setDuration("2h")}>2h</button><button className={duration === "4h" ? "selected" : ""} onClick={() => setDuration("4h")}>4h</button><button className={duration === "6h" ? "selected" : ""} onClick={() => setDuration("6h")}>6h</button></div></div><div className="guest-grid"><Counter label="Adults" value={1} onDecrease={() => toast.info("At least one adult is required.")} onIncrease={() => toast.success("Adult added.")} /><Counter label="Rooms" value={1} onDecrease={() => toast.info("At least one room is required.")} onIncrease={() => toast.success("Room added.")} /></div><label className="name-field"><small>FULL NAME</small><input defaultValue="Tanveer Hussain Khan" /></label><div className={`booking-ride-addon ${addRide ? "selected" : ""}`}><div className="booking-ride-copy"><span className="addon-icon"><CarFront size={18} /></span><span><b>Add a ride around your stay</b><small>Lucknow Airport → IYI Lavish Hotel Geetraj · from ₹549</small></span></div><button className={`addon-switch ${addRide ? "on" : ""}`} onClick={() => setAddRide(!addRide)} aria-pressed={addRide}><span /></button></div>{addRide && <div className="addon-route-summary"><div><small>PICKUP</small><b>Lucknow Airport · T2</b></div><ArrowRight size={15} /><div><small>DROP-OFF</small><b>IYI Lavish Hotel Geetraj</b></div><button onClick={() => toast.info("Ride details can be edited from the Rides tab.")}>Edit</button></div>}<h3>Coupons & offers</h3><div className="coupon-row"><input placeholder="Enter your coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} /><button onClick={() => coupon ? toast.success("Coupon applied.") : toast.error("Enter a coupon code first.")}>Redeem</button></div><div className="coupon-chips"><button onClick={() => setCoupon("IYIFLAT500")}>IYIFLAT500 <small>Apply</small></button><button onClick={() => setCoupon("IYILOVESYOU")}>IYILOVESYOU <small>Apply</small></button></div><div className="booking-total"><span>Room price ({duration})</span><b>₹999</b>{addRide && <><span className="ride-line">Ride add-on</span><b className="ride-line">₹549</b></>}<strong>Total amount <i>{addRide ? "₹1,548" : "₹999"}</i></strong><small>Tax included · {addRide ? "stay + ride" : "room only"}</small></div></div><div className="sticky-book-bar"><div><strong>{addRide ? "₹1,548" : "₹999"}</strong><small>Tax included · {addRide ? "Stay + ride" : "Room only"}</small></div><button onClick={() => onConfirm(addRide)}>{addRide ? "Confirm stay + ride" : "Confirm booking"} <ArrowRight size={18} /></button></div></section></div>;
}

function RideConfirmation({ ride, rideType, pickup, dropoff, onClose, combined = false }: { ride: typeof rideOptions[number]; rideType: string; pickup: string; dropoff: string; onClose: () => void; combined?: boolean }) {
  return <div className="sheet-backdrop"><section className="confirm-sheet"><div className="success-mark"><Check size={30} /></div><span className="eyebrow-pink">{combined ? "STAY + RIDE CONFIRMED" : "RIDE RESERVED"}</span><h2>{combined ? <>Your stay is set<br /><i>to move.</i></> : <>You’re all set<br /><i>to move.</i></>}</h2><p>{combined ? "Your room and ride are confirmed together. We’ll keep the handoff from arrival to check-in close at every step." : `Your ${rideType} ride is reserved. We’ll keep the hotel handoff close at every step.`}</p><div className="confirmation-ticket"><div><small>PICKUP</small><b>{pickup}</b></div><ArrowRight size={18} /><div><small>DROP-OFF</small><b>{dropoff}</b></div><hr /><div className="ticket-meta"><span><CalendarDays size={15} /> Tue, 02 Sep</span><span><Clock3 size={15} /> 08:30 AM</span><span><CarFront size={15} /> {ride.label}</span></div></div><button className="primary-cta" onClick={onClose}>Back to my journey <ArrowRight size={18} /></button></section></div>;
}

function MenuSheet({ onClose, onNavigate }: { onClose: () => void; onNavigate: (screen: Screen) => void }) {
  return <div className="sheet-backdrop menu-backdrop"><section className="menu-sheet"><button className="sheet-close" onClick={onClose}><X size={20} /></button><AppMark dark /><div className="menu-profile"><div><UserRound size={23} /></div><span><b>Good evening</b><small>Sign in to unlock your IYI journey</small></span><ChevronRight size={18} /></div><button onClick={() => { onNavigate("bookings"); onClose(); }}><CalendarDays size={19} /> My bookings <ChevronRight size={17} /></button><button onClick={() => { onNavigate("wallet"); onClose(); }}><WalletCards size={19} /> IYI wallet <ChevronRight size={17} /></button><button onClick={() => toast.info("Help centre is coming soon.")}><ShieldCheck size={19} /> Safety & support <ChevronRight size={17} /></button><button onClick={() => toast.info("Settings are coming soon.")}><Sparkles size={19} /> App settings <ChevronRight size={17} /></button><div className="menu-footer"><small>iYi stays + rides</small><span>Made for the moments around your stay.</span></div></section></div>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [sheet, setSheet] = useState<Sheet>(null);
  const [selectedCity, setSelectedCity] = useState("Lucknow");
  const [selectedHotel, setSelectedHotel] = useState<HotelCard>(hotels[0]);
  const [confirmedRide, setConfirmedRide] = useState<{ ride: typeof rideOptions[number]; rideType: string; pickup: string; dropoff: string; combined?: boolean } | null>(null);
  const [withRide, setWithRide] = useState(false);

  const navigate = (next: Screen) => { setSheet(null); setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openHotel = (hotel: HotelCard) => { setSelectedHotel(hotel); setSheet("hotel"); };
  const favorite = (hotel: HotelCard) => toast.success(`${hotel.name} saved to your wishlist.`);

  return <div className="iyi-app"><TopChrome onMenu={() => setSheet("menu")} onWallet={() => navigate("wallet")} /><main>{screen === "home" && <HomeScreen selectedCity={selectedCity} onCity={(city) => { setSelectedCity(city); toast.success(`${city} selected.`); }} onOpenHotel={openHotel} onFavorite={favorite} onGoRides={() => navigate("rides")} />}{screen === "search" && <SearchScreen onOpenHotel={openHotel} />}{screen === "rides" && <RidesScreen onConfirm={(ride, rideType, pickup, dropoff) => setConfirmedRide({ ride, rideType, pickup, dropoff })} />}{screen === "bookings" && <div className="empty-screen"><CalendarDays size={38} /><span className="eyebrow-pink">YOUR JOURNEY</span><h1>No bookings yet.<br /><i>Let’s change that.</i></h1><button className="primary-cta" onClick={() => navigate("rides")}>Plan a ride <ArrowRight size={18} /></button></div>}{screen === "wallet" && <div className="wallet-screen"><span className="eyebrow-pink">IYI WALLET</span><h1>Your stay,<br /><i>in balance.</i></h1><div className="wallet-card"><WalletCards size={22} /><span>Available coins</span><strong>0</strong><small>Earn on bookings and redeem on your next ride.</small></div><div className="wallet-row"><span><Sparkles size={18} /> Ride credits</span><b>Coming soon</b></div><div className="wallet-row"><span><Plus size={18} /> Add a payment method</span><ChevronRight size={18} /></div></div>}</main><BottomNav screen={screen} onNavigate={navigate} />{sheet === "hotel" && <HotelDetailSheet hotel={selectedHotel} onClose={() => setSheet(null)} onBook={() => { setWithRide(false); setSheet("booking"); }} onAddRide={() => { setWithRide(true); setSheet("booking"); }} />}{sheet === "booking" && <BookingSheet withRide={withRide} onClose={() => setSheet(null)} onConfirm={(hasRide) => { setSheet(null); if (hasRide) { setConfirmedRide({ ride: rideOptions[0], rideType: "airport", pickup: "Lucknow Airport · Terminal 2", dropoff: selectedHotel.name, combined: true }); } else { toast.success("Room booking confirmed."); } }} />}{sheet === "menu" && <MenuSheet onClose={() => setSheet(null)} onNavigate={navigate} />}{confirmedRide && <RideConfirmation ride={confirmedRide.ride} rideType={confirmedRide.rideType} pickup={confirmedRide.pickup} dropoff={confirmedRide.dropoff} combined={confirmedRide.combined} onClose={() => setConfirmedRide(null)} />}</div>;
}
