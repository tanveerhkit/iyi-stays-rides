# IYI Stays + Rides — End-to-End Workflow Deck

## Cover
**IYI Stays + Rides**

**One journey from sign-in to safe arrival**

Customer and admin workflow map · Demo product flow

## Slide 1
### The product is one connected journey

IYI joins room discovery, ride planning, and post-booking care in one guest experience.

- **Discover:** choose a city, stay, or ride service.
- **Book:** reserve a room, add a ride, and review one combined total.
- **Manage:** edit dates, route, vehicle, guests, or offers before confirmation.
- **Resolve:** cancel, request support, or track the next action from one place.

## Slide 2
### Customer entry starts with a low-friction sign-in

- **Open app:** guest lands on Home with city shortcuts, Nearby, and search.
- **Sign in / sign up:** mobile number or email → OTP → consent and profile setup.
- **Returning guest:** saved city, wallet coins, past bookings, and preferences are restored.
- **Guest mode:** browse stays and rides first; authentication is required at checkout.

Decision points: OTP success → Home; OTP failure → retry or support; incomplete profile → finish before payment.

## Slide 3
### Home makes stays and rides discoverable together

- **Browse modes:** Normal / Premium, city chips, Nearby, and search.
- **Stay discovery:** filter by Nearby, Top Rated, price low-to-high, or high-to-low.
- **Ride discovery:** tap Rides for airport pickup, station transfer, local cab, or bike.
- **Cross-sell moment:** a stay card and “Book the ride around your stay” prompt connect the two services.

## Slide 4
### A room booking becomes a complete arrival plan

1. Guest opens a hotel detail sheet.
2. Selects hourly or full-day stay, duration, room type, and guest count.
3. Taps **Add a ride to this stay**.
4. IYI pre-fills hotel drop-off and the selected stay date.
5. Guest reviews room price + ride add-on + total amount.

System guardrails: show route, pickup context, fare, cancellation policy, and availability before confirmation.

## Slide 5
### The ride add-on is configured without leaving checkout

- **Ride type:** airport, station, or local pickup.
- **Route:** edit pickup and drop-off with clear origin → destination hierarchy.
- **Timing:** pickup date and time aligned to the stay.
- **Capacity:** guests and bags captured before vehicle selection.
- **Vehicle:** Comfort Sedan, Premium Sedan, or Quick Bike with fare and capacity.

The summary updates in place so the guest never loses the room booking context.

## Slide 6
### Edit keeps the guest inside the booking flow

**Edit ride → Ride editor → Save ride → Combined summary**

The editor lets guests change:

- Ride type and vehicle.
- Pickup and drop-off addresses.
- Pickup date and time.
- Passenger and luggage counts.

Canceling the editor discards the draft. Saving returns to checkout and refreshes the route summary and combined total.

## Slide 7
### Review, offer, pay, and confirm both services together

- **Review:** room type, stay duration, ride route, vehicle, and policies.
- **Offers:** apply a coupon; IYI coins can be redeemed when eligible.
- **Payment:** show room amount, ride add-on, tax treatment, discounts, and final total.
- **Confirm:** one primary CTA confirms the stay + ride together.
- **Success:** issue a combined booking ID and show the hotel-to-ride handoff details.

## Slide 8
### Changes and cancellation stay transparent after booking

**Edit after booking**

Guest opens Bookings → selects trip → edits eligible room or ride fields → sees price difference → confirms change.

**Cancel**

Guest opens trip → taps Cancel → sees room and ride cancellation policies separately → reviews refund estimate → confirms cancellation.

**After cancellation**

Booking moves to Cancelled, refund status is visible, ride provider is notified, and support remains one tap away.

## Slide 9
### Support and safety close the loop

- **Trip support:** booking-specific help for late driver, wrong pickup, room issue, or payment problem.
- **Safety:** emergency contact, provider verification, ride details, and report flow.
- **Operations handoff:** support case receives a priority, owner, next action, and resolution status.
- **Guest communication:** app status, SMS/push updates, and clear escalation path.

## Slide 10
### Admin control starts with one calm operations console

Admin signs in → selects workspace → lands on Overview.

**Overview shows:** bookings today, ride attach rate, room revenue, open safety cases, booking activity, and quick actions.

**Navigation:** Stays · Rides · Bookings · Offers · Users & wallet · Safety · Settings.

The console uses simple status actions, filters, toggles, and small editors rather than complex configuration screens.

## Slide 11
### Admin manages the system through focused control loops

| Area | Admin controls | Guest impact |
|---|---|---|
| Stays | publish / pause property, room availability, pricing | what can be discovered and booked |
| Rides | vehicle type, fare, capacity, active state | eligible ride options and quote clarity |
| Bookings | search, filter, inspect, export, status review | faster operational resolution |
| Offers | create, edit, pause, track redemptions | relevant discounts at checkout |
| Users & wallet | review guest, adjust coins, inspect activity | accurate value and support |
| Safety | review case, resolve, verify provider checklist | safer arrivals and escalation |
| Settings | maintenance, auto-confirm, coins, alerts | controlled experience defaults |

## Slide 12
### The end state is a single source of truth for every journey

Customer flow: **Sign in → Discover → Book stay → Add ride → Edit → Pay → Confirm → Manage / Cancel → Support**

Admin flow: **Sign in → Monitor → Configure → Resolve → Communicate → Audit**

The experience is intentionally simple at the surface, while the control loops underneath keep inventory, mobility, payments, safety, and support aligned.

## References

- Product source: IYI room and rides PRD supplied in the project workspace.
- Interface source: user-provided IYI mobile app screenshots and the implemented IYI web app workflow.
- Numerical values shown in examples are demo UI values from the prototype, not production metrics.
