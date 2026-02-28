# hackathon TeamGI

**SafePath** is a navigation alternative to Google Maps designed specifically for personal safety. Unlike traditional GPS apps that prioritize the fastest route, SafePath prioritizes the safest route by allowing users to audit roads in real-time based on lighting, CCTV presence, and crowd density.

🚀**Live Demo**
https://hackathon-pwym.onrender.com/

📸 **Screenshots and Demo Video**
https://drive.google.com/drive/folders/1sReyzdPKWOEtcbpmOvjWXccDb6xghL_9?usp=sharing


🧰 **Tech Stack**
Frontend- HTML5, CSS3, Vanilla JavaScript
Maps- MapLibre GL JS v4.7.1
Routing- OSRM (Open Source Routing Machine)
Geocoding- Nominatim (OpenStreetMap)
Map Tiles- OpenFreeMap (Liberty style)
Database- Firebase Firestore
Hosting- Firebase / GitHub Pages

✨ **Features**

1. Real-Time GPS Navigation — Detects user location automatically and tracks movement during navigation with heading indicator.
2. Click or Search Destination — Set destination by clicking on the map or typing a place name (powered by Nominatim).
3. Live Route Preview — Route is drawn instantly as you pick a destination, similar to Google Maps.
4. Community Safety Reports — Users can submit safety data at their current location including:

    a. Lighting conditions (Dark / Moderate / Bright)
    b. Crowd level (Empty / Few / Busy)
    c. Safety feeling (Unsafe / Neutral / Safe)
    d. CCTV presence
    c. Danger flags (drunk people, stray dogs, construction)


5. Route Safety Summary — Aggregates Firebase safety reports and displays an average safety score with status (Safe / Moderate / Unsafe).
6. SOS Emergency Alert — One-tap SOS button that saves the user's GPS coordinates and timestamp to Firebase for emergency contacts.
7. 3D Map View — Map renders with a 45° pitch for an immersive navigation experience.

🏗️ **Architecture**
User Browser
     │
     ├─── MapLibre GL JS ──► OpenFreeMap Tiles (map rendering)
     │
     ├─── Nominatim API ────► Place search / geocoding
     │
     ├─── OSRM API ─────────► Route calculation
     │
     └─── Firebase Firestore ► Safety reports storage
                              ► SOS alerts storage

📁 **Project Structure**
safepath/
├── index.html        # Main application (UI + logic)
├── README.md         # Project documentation
├── .gitignore        #gitignore files
└── LICENSE           # License file

⚙️**Installation & Setup**
Since this is a pure frontend project, no build step is required.
Prerequisites

A modern web browser (Chrome / Firefox / Edge)
A Firebase project with Firestore enabled

Steps
# 1. Clone the repository
git clone https://github.com/your-username/ernakulam-safety-navigator.git

# 2. Navigate into the project
cd ernakulam-safety-navigator

# 3. Open directly in browser
open index.html
# or use a local server:
npx serve .

Firebase Configuration
Replace the firebaseConfig object in index.html with your own Firebase project credentials:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};

🔌 **API Reference**
OSRM Routing- https://router.project-osrm.org/route/v1/driving/ -Get driving route between two coordinates
Nominatim- https://nominatim.openstreetmap.org/search -Search place by name
OpenFreeMap- https://tiles.openfreemap.org/styles/liberty Map tile style
Firebase Firestore- db.collection("reports") -Read/write safety reports
Firebase Firestore- db.collection("sos_alerts") -Write SOS emergency alerts

👥 **Team Members**
Team Name: TeamGI
1. Melath Gopika Krishna
2. Irene Treesa Martin

🤖 **AI Tools Used**
1. Claude (Anthropic) — assisted with code structuring and README generation
2. ChatGPT- assisted with code structuring

📄 **License**
This project is licensed under the MIT License.

