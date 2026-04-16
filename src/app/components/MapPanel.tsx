import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, ZoomOut, Maximize2, Navigation, AlertTriangle } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import L from "leaflet";

// Leaflet marker icons fix for React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapPanelProps {
  showTraffic: boolean;
  showAqi: boolean;
  showWeather: boolean;
  incidents?: { id: string; x: number; y: number; label: string; type: string }[];
}

// Controller component to bridge external controls with Leaflet map
function MapController({ zoom, center }: { zoom: number, center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [zoom, center, map]);

  // Fix for partial loading/grey squares: re-calculate size after initial render
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

export function MapPanel({ showTraffic, showAqi, showWeather, incidents = [] }: MapPanelProps) {
  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState<[number, number]>([27.7172, 85.3240]); // Kathmandu Center

  // Real-world Landmarks of Kathmandu (Expanded GPS Repository)
  const landmarks = useMemo(() => [
    // Heritage & Major Landmarks (Level 1 - Always visible)
    { position: [27.7042, 85.3072] as [number, number], label: "Basantapur", type: "heritage", traffic: "high", level: 1 },
    { position: [27.7132, 85.3152] as [number, number], label: "Narayanhiti", type: "palace", traffic: "medium", level: 1 },
    { position: [27.7149, 85.2903] as [number, number], label: "Swoyambhu", type: "heritage", traffic: "low", level: 1 },
    { position: [27.7104, 85.3486] as [number, number], label: "Pashupatinath", type: "heritage", traffic: "high", level: 1 },
    { position: [27.7215, 85.3620] as [number, number], label: "Boudhanath", type: "heritage", traffic: "medium", level: 1 },
    { position: [27.6727, 85.3252] as [number, number], label: "Patan Durbar Sq", type: "heritage", traffic: "medium", level: 1 },
    { position: [27.6970, 85.3563] as [number, number], label: "TIA Airport", type: "transport", traffic: "high", level: 1 },
    { position: [27.6983, 85.3225] as [number, number], label: "Singha Durbar", type: "govt", traffic: "high", level: 1 },
    { position: [27.7006, 85.3121] as [number, number], label: "Dharahara", type: "heritage", traffic: "medium", level: 1 },
    
    // Major Hubs & Junctions (Level 2 - Visible at zoom > 13)
    { position: [27.7345, 85.3340] as [number, number], label: "Maharajgunj", type: "hub", traffic: "high", level: 2 },
    { position: [27.6942, 85.2825] as [number, number], label: "Kalanki", type: "hub", traffic: "critical", level: 2 },
    { position: [27.6762, 85.3496] as [number, number], label: "Koteshwor", type: "hub", traffic: "critical", level: 2 },
    { position: [27.6830, 85.3040] as [number, number], label: "Balkhu", type: "hub", traffic: "medium", level: 2 },
    { position: [27.7160, 85.3160] as [number, number], label: "Lainchaur", type: "hub", traffic: "high", level: 2 },
    { position: [27.7170, 85.3450] as [number, number], label: "Chabahil", type: "hub", traffic: "high", level: 2 },
    { position: [27.6917, 85.3323] as [number, number], label: "New Baneshwor", type: "hub", traffic: "high", level: 2 },
    { position: [27.6935, 85.3190] as [number, number], label: "Maitighar", type: "hub", traffic: "high", level: 2 },
    { position: [27.7055, 85.3150] as [number, number], label: "Ratna Park", type: "hub", traffic: "high", level: 2 },
    { position: [27.7470, 85.3140] as [number, number], label: "Gongabu", type: "hub", traffic: "critical", level: 2 },
    
    // Sub-Hubs & Points of Interest (Level 3 - Visible at zoom > 14)
    { position: [27.7035, 85.2990] as [number, number], label: "Kalimati", type: "market", traffic: "high", level: 3 },
    { position: [27.6980, 85.3050] as [number, number], label: "Teku", type: "hub", traffic: "medium", level: 3 },
    { position: [27.6910, 85.3100] as [number, number], label: "Tripureshwor", type: "hub", traffic: "high", level: 3 },
    { position: [27.6920, 85.3210] as [number, number], label: "Thapathali", type: "hub", traffic: "critical", level: 3 },
    { position: [27.7100, 85.3210] as [number, number], label: "Kamalpokhari", type: "hub", traffic: "medium", level: 3 },
    { position: [27.7220, 85.3180] as [number, number], label: "Lazimpat", type: "hub", traffic: "medium", level: 3 },
    { position: [27.7080, 85.3150] as [number, number], label: "Jamal", type: "hub", traffic: "high", level: 3 },
    { position: [27.6880, 85.3400] as [number, number], label: "Shantinagar", type: "sector", traffic: "medium", level: 3 },
    { position: [27.6950, 85.3480] as [number, number], label: "Sinamangal", type: "sector", traffic: "high", level: 3 },
    { position: [27.6780, 85.3200] as [number, number], label: "Jawalakhel", type: "hub", traffic: "high", level: 3 },
    { position: [27.6700, 85.3230] as [number, number], label: "Lagankhel", type: "hub", traffic: "high", level: 3 },
  ], []);

  // Major Road Network Polylines (Segmented for high-fidelity)
  const roads = useMemo(() => [
    // Ring Road Segments
    { name: "Ring Road SW", path: [[27.6942, 85.2825], [27.6830, 85.3040], [27.6762, 85.3150], [27.6727, 85.3252]] as L.LatLngExpression[], level: "critical" },
    { name: "Ring Road SE", path: [[27.6727, 85.3252], [27.6762, 85.3496], [27.6970, 85.3563]] as L.LatLngExpression[], level: "high" },
    { name: "Ring Road NE", path: [[27.6970, 85.3563], [27.7215, 85.3620], [27.7345, 85.3340]] as L.LatLngExpression[], level: "medium" },
    { name: "Ring Road NW", path: [[27.7345, 85.3340], [27.7470, 85.3140], [27.7350, 85.2950], [27.7149, 85.2903], [27.6942, 85.2825]] as L.LatLngExpression[], level: "high" },
    
    // Arterial Arteries
    { name: "Arniko Hwy", path: [[27.6935, 85.3190], [27.6917, 85.3323], [27.6762, 85.3496], [27.6600, 85.3800]] as L.LatLngExpression[], level: "critical" },
    { name: "Kantipath", path: [[27.7345, 85.3340], [27.7220, 85.3180], [27.7160, 85.3160], [27.7055, 85.3150], [27.6910, 85.3100]] as L.LatLngExpression[], level: "high" },
    { name: "Putalisadak", path: [[27.7100, 85.3210], [27.7055, 85.3200], [27.6910, 85.3210]] as L.LatLngExpression[], level: "high" },
    { name: "Bishnumati Link", path: [[27.7350, 85.2950], [27.7100, 85.2950], [27.6980, 85.3050], [27.6830, 85.3040]] as L.LatLngExpression[], level: "medium" },
    { name: "Bagmati Corridor", path: [[27.6920, 85.3210], [27.6880, 85.3250], [27.6800, 85.3350]] as L.LatLngExpression[], level: "low" },
  ], []);

  const getTrafficColor = (level: string) => {
    switch (level) {
      case "low": return "#10b981"; // emerald-500
      case "medium": return "#f59e0b"; // amber-500
      case "high": return "#f43f5e"; // rose-500
      case "critical": return "#be123c"; // deep-rose
      default: return "#94a3b8"; // slate-400
    }
  };

  const getTrafficClass = (level: string) => {
    switch (level) {
      case "low": return "traffic-line-animate"; // Slow crawl
      case "medium": return "traffic-line-slow";
      case "high": return "traffic-line-animate";
      case "critical": return "traffic-line-fast"; // Fast crawl
      default: return "";
    }
  };

  const getMarkerColor = (level: string) => {
    switch (level) {
      case "low": return "bg-emerald-500";
      case "medium": return "bg-amber-500";
      case "high": return "bg-rose-500";
      case "critical": return "bg-rose-700";
      default: return "bg-blue-500";
    }
  };

  const aqiSectors = useMemo(() => landmarks.map(l => ({
    position: l.position,
    val: 140 + Math.random() * 40
  })), [landmarks]);

  // Weather Rain Overlay (Adaptation)
  const rainOverlay = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none z-[1000] mix-blend-overlay">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-[0.5px] h-8 bg-blue-300/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10%',
          }}
          animate={{ y: ['0vh', '110vh'] }}
          transition={{
            duration: 0.6 + Math.random() * 0.4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  ), []);

  return (
    <div className="absolute inset-0 bg-slate-50 overflow-hidden select-none">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        zoomControl={false}
        className="w-full h-full grayscale-[0.2] contrast-[1.1]"
      >
        <MapController zoom={zoom} center={center} />
        
        {/* Professional Tile Layer - CartoDB Positron */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {/* Traffic Network Layer */}
        {showTraffic && roads.map((road, i) => (
          <Polyline 
            key={i}
            positions={road.path as L.LatLngExpression[]}
            className={getTrafficClass(road.level)}
            pathOptions={{
              color: getTrafficColor(road.level),
              weight: 5,
              lineCap: 'round',
              lineJoin: 'round',
              opacity: 0.8
            }}
          />
        ))}

        {/* AQI Heat Overlay */}
        {showAqi && aqiSectors.map((sector, i) => (
          <Circle
            key={i}
            center={sector.position}
            radius={800}
            pathOptions={{
              fillColor: sector.val > 150 ? '#f43f5e' : '#f59e0b',
              fillOpacity: 0.15,
              stroke: false
            }}
          />
        ))}

        {/* Landmark Markers (with Zoom-based Filtering) */}
        {landmarks
          .filter(l => {
            if (l.level === 1) return true;
            if (l.level === 2 && zoom >= 13) return true;
            if (l.level === 3 && zoom >= 15) return true;
            return false;
          })
          .map((l, i) => (
          <Marker 
            key={i} 
            position={l.position}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `<div class="flex flex-col items-center group cursor-pointer translate-y-[-50%]">
                <div class="w-3 h-3 rounded-full border-2 border-white shadow-md transition-all group-hover:scale-150 ${showTraffic ? getMarkerColor(l.traffic) : 'bg-slate-400'}"></div>
                ${zoom >= 14 || l.level === 1 ? `<div class="mt-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm border border-slate-200 text-[10px] font-bold text-slate-700 whitespace-nowrap opacity-100 transition-all">${l.label}</div>` : ''}
              </div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="text-xs font-bold text-slate-800">{l.label}</h3>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{l.type} - {l.traffic} traffic</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Dynamic Incidents */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={landmarks[Math.floor(Math.random() * landmarks.length)].position} // Simulated geographic snapping
            icon={L.divIcon({
              className: 'incident-marker',
              html: `<div class="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center animate-bounce border border-rose-500/30">
                <div class="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
              </div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            })}
          />
        ))}
      </MapContainer>

      {/* Weather Overlay Overlay */}
      {showWeather && rainOverlay}

      {/* Floating Control Hub */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-[1000]">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-1.5 shadow-xl flex flex-col gap-1.5">
          {[
            { icon: ZoomIn, onClick: () => setZoom(z => Math.min(z + 1, 18)), label: "Zoom In" },
            { icon: ZoomOut, onClick: () => setZoom(z => Math.max(z - 1, 8)), label: "Zoom Out" },
            { icon: Navigation, onClick: () => setCenter([27.7172, 85.3240]), label: "Center Map" },
            { icon: Maximize2, label: "Full View" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              title={btn.label}
              className="w-10 h-10 bg-white hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-all active:scale-95 shadow-sm"
            >
              <btn.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
        
        {/* Zoom Level Chip */}
        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full shadow-lg self-end">
          <div className="text-[10px] text-slate-300 uppercase font-black tracking-[0.2em]">L-{zoom}</div>
        </div>
      </div>
    </div>
  );
}
