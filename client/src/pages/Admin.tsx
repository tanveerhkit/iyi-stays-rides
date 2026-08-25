/* IYI admin console: simple operational controls for stays, rides, bookings, offers, wallet, users, safety, and settings. */
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  Bike,
  CarFront,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  CreditCard,
  Hotel,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Percent,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ToggleLeft,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type Section = "overview" | "stays" | "rides" | "bookings" | "offers" | "users" | "safety" | "settings";

type Stay = { name: string; city: string; type: string; price: string; status: "Live" | "Paused"; rooms: number };
type Ride = { name: string; detail: string; fare: string; status: "Active" | "Paused"; bookings: number };
type Booking = { id: string; guest: string; product: string; amount: string; status: "Confirmed" | "Pending" | "Cancelled"; time: string };

const stays: Stay[] = [
  { name: "IYI Lavish Hotel Geetraj", city: "Lucknow", type: "Hourly rooms", price: "₹999", status: "Live", rooms: 18 },
  { name: "IYI Lavish The Tehzeeb Living", city: "Lucknow", type: "Hourly + overnight", price: "₹999", status: "Live", rooms: 11 },
  { name: "IYI Splendid Hotel Sanwariya", city: "Lucknow", type: "Hourly rooms", price: "₹599", status: "Paused", rooms: 0 },
];
const rides: Ride[] = [
  { name: "Comfort Sedan", detail: "3 guests · 2 bags", fare: "₹549", status: "Active", bookings: 32 },
  { name: "Premium Sedan", detail: "4 guests · 3 bags", fare: "₹799", status: "Active", bookings: 14 },
  { name: "Quick Bike", detail: "1 guest · light luggage", fare: "₹249", status: "Paused", bookings: 9 },
];
const bookings: Booking[] = [
  { id: "IYI-2481", guest: "Tanveer Hussain Khan", product: "Geetraj + airport ride", amount: "₹1,548", status: "Confirmed", time: "2 min ago" },
  { id: "IYI-2479", guest: "Simran Kulkarni", product: "The Tehzeeb Living", amount: "₹999", status: "Pending", time: "18 min ago" },
  { id: "IYI-2474", guest: "Amit Patel", product: "Quick Bike · local", amount: "₹249", status: "Cancelled", time: "41 min ago" },
  { id: "IYI-2468", guest: "Rhea Singh", product: "Sanwariya + station ride", amount: "₹1,148", status: "Confirmed", time: "1 hr ago" },
];

const navItems: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "stays", label: "Stays", icon: Hotel },
  { id: "rides", label: "Rides", icon: CarFront },
  { id: "bookings", label: "Bookings", icon: ClipboardList },
  { id: "offers", label: "Offers", icon: Percent },
  { id: "users", label: "Users & wallet", icon: Users },
  { id: "safety", label: "Safety", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

function StatusPill({ status }: { status: string }) {
  return <span className={`admin-status ${status.toLowerCase()}`}><span />{status}</span>;
}

function AdminSidebar({ section, onSelect, open, onClose }: { section: Section; onSelect: (section: Section) => void; open: boolean; onClose: () => void }) {
  return <aside className={`admin-sidebar ${open ? "open" : ""}`}><div className="admin-brand"><div className="admin-brand-mark">iYi</div><div><b>iYi control</b><small>STAYS + RIDES</small></div><button className="admin-mobile-close" onClick={onClose}><X size={19} /></button></div><div className="admin-workspace"><span className="admin-workspace-dot" /><span>Lucknow workspace</span><ChevronRight size={15} /></div><nav className="admin-nav">{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={section === id ? "active" : ""} onClick={() => { onSelect(id); onClose(); }}><Icon size={18} /><span>{label}</span>{id === "safety" && <i>2</i>}</button>)}</nav><div className="admin-side-footer"><div className="admin-help"><CircleHelp size={17} /><span><b>Need a hand?</b><small>Open support centre</small></span></div><button className="admin-back-app" onClick={() => { window.location.href = "/"; }}><ArrowLeft size={16} /> Back to app</button><span className="admin-version">Demo console · v0.1</span></div></aside>;
}

function AdminHeader({ section, onMenu }: { section: Section; onMenu: () => void }) {
  const title = navItems.find((item) => item.id === section)?.label ?? "Overview";
  return <header className="admin-header"><button className="admin-mobile-menu" onClick={onMenu}><Menu size={21} /></button><div><span className="admin-breadcrumb">IYI CONTROL / {title.toUpperCase()}</span><h1>{title}</h1></div><div className="admin-header-actions"><label className="admin-search"><Search size={16} /><input placeholder="Search anything" /></label><button className="admin-icon-button" onClick={() => toast.info("No new notifications.")}><Bell size={18} /><i /></button><button className="admin-avatar" onClick={() => toast.info("Signed in as Admin")} >A</button></div></header>;
}

function StatCard({ label, value, change, icon: Icon, tone }: { label: string; value: string; change: string; icon: typeof BarChart3; tone: string }) {
  return <div className="admin-stat"><div className={`admin-stat-icon ${tone}`}><Icon size={19} /></div><div><span>{label}</span><strong>{value}</strong><small>{change}</small></div></div>;
}

function Overview({ setSection }: { setSection: (section: Section) => void }) {
  return <div className="admin-content"><div className="admin-welcome"><div><span className="admin-kicker">TUESDAY · 02 SEP 2026</span><h2>Good morning, admin.</h2><p>Here’s the pulse of the IYI journey today.</p></div><button className="admin-primary" onClick={() => setSection("bookings")}><ClipboardList size={16} /> View live bookings</button></div><div className="admin-stats"><StatCard label="Bookings today" value="48" change="↑ 12% vs yesterday" icon={ClipboardList} tone="pink" /><StatCard label="Ride attach rate" value="34%" change="↑ 6 points this week" icon={CarFront} tone="yellow" /><StatCard label="Room revenue" value="₹42.8k" change="↑ 18% vs last week" icon={BarChart3} tone="plum" /><StatCard label="Open safety cases" value="2" change="Both need attention" icon={ShieldCheck} tone="red" /></div><div className="admin-grid-two"><section className="admin-panel"><div className="admin-panel-head"><div><span className="admin-kicker">TODAY AT A GLANCE</span><h3>Booking activity</h3></div><button onClick={() => setSection("bookings")}>View all <ChevronRight size={15} /></button></div><div className="activity-chart"><div className="chart-y"><span>60</span><span>40</span><span>20</span><span>0</span></div><div className="chart-bars">{[28, 42, 31, 53, 38, 47, 68, 56, 72, 61, 79, 64].map((height, index) => <div key={index} className="chart-bar-wrap"><div className="chart-bar" style={{ height: `${height}%` }} /><small>{["8","9","10","11","12","1","2","3","4","5","6","7"][index]}</small></div>)}</div></div></section><section className="admin-panel alerts-panel"><div className="admin-panel-head"><div><span className="admin-kicker">NEEDS A LOOK</span><h3>Quick actions</h3></div><MoreHorizontal size={18} /></div><button className="quick-action" onClick={() => setSection("safety")}><span className="quick-action-icon alert"><AlertTriangle size={17} /></span><span><b>2 safety cases</b><small>Review guest reports</small></span><ChevronRight size={16} /></button><button className="quick-action" onClick={() => setSection("stays")}><span className="quick-action-icon rooms"><Hotel size={17} /></span><span><b>3 stays listed</b><small>1 currently paused</small></span><ChevronRight size={16} /></button><button className="quick-action" onClick={() => setSection("offers")}><span className="quick-action-icon offers"><Percent size={17} /></span><span><b>2 offers live</b><small>₹70 welcome discount</small></span><ChevronRight size={16} /></button></section></div><section className="admin-panel"><div className="admin-panel-head"><div><span className="admin-kicker">LATEST</span><h3>Recent bookings</h3></div><button onClick={() => setSection("bookings")}>Manage bookings <ChevronRight size={15} /></button></div><BookingTable rows={bookings.slice(0, 3)} /></section></div>;
}

function BookingTable({ rows }: { rows: Booking[] }) {
  return <div className="booking-table"><div className="booking-table-head"><span>Booking</span><span>Guest</span><span>Product</span><span>Total</span><span>Status</span><span /></div>{rows.map((booking) => <div className="booking-row" key={booking.id}><span><b>{booking.id}</b><small>{booking.time}</small></span><span>{booking.guest}</span><span>{booking.product}</span><b>{booking.amount}</b><StatusPill status={booking.status} /><button onClick={() => toast.info(`Opening ${booking.id}`)} aria-label={`Open ${booking.id}`}><ChevronRight size={16} /></button></div>)}</div>;
}

function StayManager() {
  const [data, setData] = useState(stays);
  return <div className="admin-content"><AdminIntro kicker="INVENTORY" title="Keep every stay ready." description="Manage what guests see, book, and pay for in a few clear actions." action="Add a stay" onAction={() => toast.success("Stay editor opened in demo mode.")} /><div className="admin-filter-row"><label className="admin-search wide"><Search size={16} /><input placeholder="Search stays" /></label><button className="admin-filter active">All stays</button><button className="admin-filter">Live</button><button className="admin-filter">Paused</button></div><div className="admin-card-list">{data.map((stay) => <div className="admin-list-card" key={stay.name}><div className="admin-list-image stay-image"><Hotel size={24} /></div><div className="admin-list-main"><span className="admin-kicker">{stay.city} · {stay.type}</span><h3>{stay.name}</h3><p>{stay.rooms ? `${stay.rooms} rooms available` : "No rooms available"} · from {stay.price}</p></div><StatusPill status={stay.status} /><div className="admin-list-actions"><button onClick={() => toast.success(`${stay.name} editor opened.`)}>Edit</button><button onClick={() => setData(data.map((item) => item.name === stay.name ? { ...item, status: item.status === "Live" ? "Paused" : "Live" } : item))}>{stay.status === "Live" ? "Pause" : "Publish"}</button></div></div>)}</div></div>;
}

function RideManager() {
  const [data, setData] = useState(rides);
  return <div className="admin-content"><AdminIntro kicker="MOBILITY CATALOG" title="Keep rides simple." description="Control vehicle types, fares, and availability without touching the guest journey." action="Add ride type" onAction={() => toast.success("Ride type editor opened in demo mode.")} /><div className="admin-summary-strip"><span><CarFront size={17} /> Active ride types <b>2</b></span><span><Bike size={17} /> City coverage <b>Lucknow</b></span><span><Clock3 size={17} /> Avg. pickup <b>5 min</b></span></div><div className="admin-card-list">{data.map((ride) => { const Icon = ride.name.includes("Bike") ? Bike : CarFront; return <div className="admin-list-card" key={ride.name}><div className="admin-list-image ride-image"><Icon size={24} /></div><div className="admin-list-main"><span className="admin-kicker">{ride.detail}</span><h3>{ride.name}</h3><p>Base fare {ride.fare} · {ride.bookings} bookings today</p></div><StatusPill status={ride.status} /><div className="admin-list-actions"><button onClick={() => toast.success(`${ride.name} editor opened.`)}>Edit fare</button><button onClick={() => setData(data.map((item) => item.name === ride.name ? { ...item, status: item.status === "Active" ? "Paused" : "Active" } : item))}>{ride.status === "Active" ? "Pause" : "Activate"}</button></div></div>; })}</div></div>;
}

function BookingManager() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? bookings : bookings.filter((item) => item.status === filter);
  return <div className="admin-content"><AdminIntro kicker="OPERATIONS" title="See every journey." description="Room-only, ride-only, or combined bookings—all in one calm view." action="Export report" onAction={() => toast.success("Demo report exported.")} /><div className="admin-filter-row"><label className="admin-search wide"><Search size={16} /><input placeholder="Search by booking ID or guest" /></label>{["All", "Confirmed", "Pending", "Cancelled"].map((item) => <button key={item} className={`admin-filter ${filter === item ? "active" : ""}`} onClick={() => setFilter(item)}>{item}</button>)}</div><section className="admin-panel"><BookingTable rows={shown} /></section></div>;
}

function OffersManager() {
  const [offers, setOffers] = useState([{ code: "IYIFLAT500", detail: "Welcome discount of ₹70", uses: 128, live: true }, { code: "IYILOVESYOU", detail: "10% off on your next ride", uses: 64, live: true }, { code: "RIDEHOME", detail: "₹100 off airport pickups", uses: 0, live: false }]);
  return <div className="admin-content"><AdminIntro kicker="GROWTH TOOLS" title="Make the right offer." description="Create, pause, and track the small nudges that help guests complete a journey." action="Create offer" onAction={() => toast.success("Offer editor opened in demo mode.")} /><div className="offer-grid">{offers.map((offer) => <div className="offer-card" key={offer.code}><div className="offer-card-top"><span className="offer-code">{offer.code}</span><button className={`admin-toggle ${offer.live ? "on" : ""}`} onClick={() => setOffers(offers.map((item) => item.code === offer.code ? { ...item, live: !item.live } : item))}><span /></button></div><h3>{offer.detail}</h3><p>{offer.uses ? `${offer.uses} redemptions this month` : "No redemptions yet"}</p><div className="offer-card-footer"><StatusPill status={offer.live ? "Live" : "Paused"} /><button onClick={() => toast.info(`Editing ${offer.code}`)}>Edit <ChevronRight size={14} /></button></div></div>)}</div></div>;
}

function UsersManager() {
  return <div className="admin-content"><AdminIntro kicker="GUESTS & VALUE" title="Keep guests looked after." description="Review guest accounts, wallet balances, and support signals from one simple workspace." action="Adjust wallet" onAction={() => toast.success("Wallet adjustment opened in demo mode.")} /><div className="admin-stats compact"><StatCard label="Registered guests" value="1,248" change="↑ 9% this month" icon={Users} tone="pink" /><StatCard label="Coins in circulation" value="18.4k" change="₹18.4k redemption value" icon={WalletCards} tone="yellow" /><StatCard label="Wallet adjustments" value="7" change="This week" icon={CreditCard} tone="plum" /></div><section className="admin-panel"><div className="admin-panel-head"><div><span className="admin-kicker">RECENT GUESTS</span><h3>Account activity</h3></div><button onClick={() => toast.info("Full guest directory opened.")}>View directory <ChevronRight size={15} /></button></div>{["Tanveer Hussain Khan", "Simran Kulkarni", "Rhea Singh"].map((name, index) => <div className="user-row" key={name}><div className="user-avatar">{name[0]}</div><div><b>{name}</b><small>{index === 0 ? "Booked a stay + airport ride" : index === 1 ? "Redeemed IYIFLAT500" : "New guest · Lucknow"}</small></div><span>{index === 0 ? "₹1,548" : index === 1 ? "70 coins" : "0 coins"}</span><button onClick={() => toast.info(`Opening ${name}`)}><ChevronRight size={16} /></button></div>)}</section></div>;
}

function SafetyManager() {
  const [resolved, setResolved] = useState<string[]>([]);
  const cases = [{ id: "SAFE-021", title: "Guest could not reach assigned driver", detail: "Airport pickup · 18 min ago", level: "High" }, { id: "SAFE-020", title: "Pickup point needs clarification", detail: "Hotel Geetraj · 42 min ago", level: "Medium" }];
  return <div className="admin-content"><AdminIntro kicker="TRUST & CARE" title="Keep every arrival safe." description="Give your team a calm place to review reports, verify providers, and record the next action." action="Safety settings" onAction={() => toast.info("Safety settings opened.")} /><div className="safety-banner"><ShieldCheck size={21} /><div><b>All active ride providers are verified.</b><span>Last verification run today at 08:15 AM.</span></div><StatusPill status="Active" /></div><div className="admin-card-list">{cases.map((item) => resolved.includes(item.id) ? <div className="resolved-row" key={item.id}><Check size={17} /> {item.id} marked resolved</div> : <div className="case-card" key={item.id}><div className={`case-icon ${item.level.toLowerCase()}`}><AlertTriangle size={18} /></div><div><span className="admin-kicker">{item.id} · {item.level} PRIORITY</span><h3>{item.title}</h3><p>{item.detail}</p></div><button className="admin-outline" onClick={() => setResolved([...resolved, item.id])}>Mark resolved</button><MoreHorizontal size={18} /></div>)}</div><section className="admin-panel safety-checklist"><div className="admin-panel-head"><div><span className="admin-kicker">OPERATIONS CHECKLIST</span><h3>Before a ride goes live</h3></div></div>{["Provider documents verified", "Emergency contact is reachable", "Fare and cancellation policy reviewed"].map((item) => <label key={item}><input type="checkbox" defaultChecked /><span>{item}</span><Check size={15} /></label>)}</section></div>;
}

function SettingsManager() {
  const [toggles, setToggles] = useState({ maintenance: false, autoConfirm: true, sms: true, coins: true });
  const flip = (key: keyof typeof toggles) => setToggles({ ...toggles, [key]: !toggles[key] });
  return <div className="admin-content"><AdminIntro kicker="WORKSPACE" title="Set the house rules." description="Small controls for the operational defaults that shape the IYI guest experience." action="Save changes" onAction={() => toast.success("Settings saved in demo mode.")} /><section className="settings-group"><div><span className="admin-kicker">APP CONTROLS</span><h3>Guest experience</h3></div><SettingRow label="Maintenance mode" detail="Temporarily hide live booking actions" value={toggles.maintenance} onToggle={() => flip("maintenance")} /><SettingRow label="Auto-confirm room bookings" detail="Confirm eligible room orders instantly" value={toggles.autoConfirm} onToggle={() => flip("autoConfirm")} /><SettingRow label="Allow IYI coins" detail="Let guests earn and redeem wallet coins" value={toggles.coins} onToggle={() => flip("coins")} /></section><section className="settings-group"><div><span className="admin-kicker">NOTIFICATIONS</span><h3>How the team hears from IYI</h3></div><SettingRow label="SMS alerts for ride changes" detail="Send operations a message when a ride is delayed" value={toggles.sms} onToggle={() => flip("sms")} /><button className="settings-link" onClick={() => toast.info("Team notification contacts opened.")}>Manage notification contacts <ChevronRight size={16} /></button></section></div>;
}

function SettingRow({ label, detail, value, onToggle }: { label: string; detail: string; value: boolean; onToggle: () => void }) {
  return <div className="setting-row"><div><b>{label}</b><small>{detail}</small></div><button className={`admin-toggle ${value ? "on" : ""}`} onClick={onToggle} aria-pressed={value}><span /></button></div>;
}

function AdminIntro({ kicker, title, description, action, onAction }: { kicker: string; title: string; description: string; action: string; onAction: () => void }) {
  return <div className="admin-intro"><div><span className="admin-kicker">{kicker}</span><h2>{title}</h2><p>{description}</p></div><button className="admin-primary" onClick={onAction}><Plus size={16} /> {action}</button></div>;
}

export default function Admin() {
  const [section, setSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const content = section === "overview" ? <Overview setSection={setSection} /> : section === "stays" ? <StayManager /> : section === "rides" ? <RideManager /> : section === "bookings" ? <BookingManager /> : section === "offers" ? <OffersManager /> : section === "users" ? <UsersManager /> : section === "safety" ? <SafetyManager /> : <SettingsManager />;
  return <div className="admin-app"><AdminSidebar section={section} onSelect={setSection} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="admin-main"><AdminHeader section={section} onMenu={() => setSidebarOpen(true)} />{content}</div></div>;
}
