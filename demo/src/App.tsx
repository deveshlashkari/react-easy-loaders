import React, { useState } from "react";
import {
  LoaderProvider,
  useLoader,
  Loader,
  createLoader,
  Spinner,
  Ring,
  DualRing,
  Dots,
  Bars,
  Pulse,
  Bounce,
  Ripple,
  Roller,
  Grid,
  Wave,
  Progress,
  LoaderOverlay,
} from "../../src";

// Custom loader example
const CustomHeartLoader = createLoader(
  ({ color, size, speed, className, style }: any) => (
    <div
      className={className}
      style={{
        fontSize: size,
        color,
        animation: `heartbeat ${1 / (speed || 1)}s ease-in-out infinite`,
        ...style,
      }}
    >
      ❤️
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
);

// Demo component that uses the loader context
const LoaderDemo: React.FC = () => {
  const { showLoader, hideLoader } = useLoader();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [progressValues, setProgressValues] = useState([25, 50, 75, 90]);
  const [activeTab, setActiveTab] = useState<"demo" | "guide">("demo");

  // Custom loader playground state
  const [selectedTemplate, setSelectedTemplate] = useState("spinner");
  const [loaderColor, setLoaderColor] = useState("#ffffff");
  const [loaderSize, setLoaderSize] = useState(50);
  const [loaderSpeed, setLoaderSpeed] = useState(1);
  const [imageUrl, setImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/3884/3884851.png"
  ); // Default spinner icon

  // Inject CSS keyframes into document
  React.useEffect(() => {
    const styleId = "custom-loader-animations";
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes bounce {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(0.3); }
      }
      @keyframes ripple {
        0% { transform: scale(0); opacity: 0.6; }
        100% { transform: scale(1); opacity: 0; }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
      }
      @keyframes fade {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, []);

  // Predefined custom loader templates
  const customLoaderTemplates = {
    spinner: createLoader(({ color, size, speed }: any) => (
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid ${color}30`,
          borderTop: `3px solid ${color}`,
          borderRadius: "50%",
          animation: `spin ${1 / speed}s linear infinite`,
        }}
      />
    )),
    conicGradient: createLoader(({ color, size, speed }: any) => (
      <div
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${color}, ${color}80, transparent, ${color})`,
          borderRadius: "50%",
          animation: `spin ${1 / speed}s linear infinite`,
        }}
      />
    )),
    bouncingBars: createLoader(({ color, size, speed }: any) => (
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "flex-end",
          height: size,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: size / 4,
              height: size * 0.8,
              background: color,
              borderRadius: "2px",
              animation: `bounce ${1.2 / speed}s ease-in-out ${
                i * 0.1
              }s infinite`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
    )),
    ripple: createLoader(({ color, size, speed }: any) => (
      <div style={{ position: "relative", width: size, height: size }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: `2px solid ${color}`,
              borderRadius: "50%",
              animation: `ripple ${2 / speed}s ease-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>
    )),
    pulse: createLoader(({ color, size, speed }: any) => (
      <div
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: "50%",
          animation: `pulse ${1.5 / speed}s ease-in-out infinite`,
        }}
      />
    )),
    squares: createLoader(({ color, size, speed }: any) => (
      <div
        style={{
          display: "grid",
          gridTemplate: "repeat(2, 1fr) / repeat(2, 1fr)",
          gap: "4px",
          width: size,
          height: size,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: color,
              borderRadius: "2px",
              animation: `fade ${2 / speed}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    )),
    image: createLoader(({ size, speed }: any) => (
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          animation: `spin ${1 / speed}s linear infinite`,
        }}
      />
    )),
  };

  const CustomLoaderComponent =
    customLoaderTemplates[
      selectedTemplate as keyof typeof customLoaderTemplates
    ];

  // Animate progress values
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgressValues((prev) =>
        prev.map((val) => {
          const newVal = val + 5;
          return newVal > 100 ? 0 : newVal;
        })
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleShowOverlayLoader = () => {
    showLoader(
      // @ts-ignore
      <Spinner color="#ffffff" size={50} />,
      "Loading your content..."
    );
    setTimeout(hideLoader, 3000);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header with Navigation */}
      <header
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <h1 style={{ margin: 0, color: "white", fontSize: "1.5rem" }}>
            🚀 React Easy Loaders
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.9rem",
            }}
          >
            by Devesh Lashkari
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a
            href="https://github.com/DeveshLashkari/react-easy-loaders"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "8px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-easy-loaders"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "8px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 5.619H13.2l-.029-1.31h3.618l-.009-2.867-8.833-.009v4.867h9.888l.029 8.685L6.686 19.43c-1.037-.309-1.556-.956-1.556-1.942V5.323z" />
            </svg>
            npm
          </a>
        </div>
      </header>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          background: "rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          onClick={() => setActiveTab("demo")}
          style={{
            padding: "12px 24px",
            backgroundColor:
              activeTab === "demo" ? "rgba(255,255,255,0.1)" : "transparent",
            color: "#ffffff",
            border: "none",
            borderBottom:
              activeTab === "demo"
                ? "2px solid #ffffff"
                : "2px solid transparent",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: activeTab === "demo" ? "bold" : "normal",
            transition: "all 0.2s ease",
          }}
        >
          🎮 Interactive Demo
        </button>
        <button
          onClick={() => setActiveTab("guide")}
          style={{
            padding: "12px 24px",
            backgroundColor:
              activeTab === "guide" ? "rgba(255,255,255,0.1)" : "transparent",
            color: "#ffffff",
            border: "none",
            borderBottom:
              activeTab === "guide"
                ? "2px solid #ffffff"
                : "2px solid transparent",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: activeTab === "guide" ? "bold" : "normal",
            transition: "all 0.2s ease",
          }}
        >
          📚 Installation & Usage
        </button>
      </div>

      {activeTab === "demo" && (
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              color: "white",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "3rem", fontWeight: "bold" }}>
              Beautiful Loading Components
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
              12 customizable React loading components with TypeScript support
            </p>
          </div>

          {/* Overlay Demo */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "1rem" }}>
              Overlay Loaders
            </h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={handleShowOverlayLoader}
                style={{
                  padding: "12px 24px",
                  background: "#ffffff",
                  color: "black",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Show Context Loader
              </button>
              <button
                onClick={() => setOverlayOpen(!overlayOpen)}
                style={{
                  padding: "12px 24px",
                  background: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Toggle Overlay Loader
              </button>
            </div>
          </div>

          {/* Built-in Loaders Grid */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "2rem" }}>
              Built-in Loaders
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2rem",
              }}
            >
              {[
                { name: "Spinner", component: Spinner },
                { name: "Ring", component: Ring },
                { name: "DualRing", component: DualRing },
                { name: "Dots", component: Dots },
                { name: "Bars", component: Bars },
                { name: "Pulse", component: Pulse },
                { name: "Bounce", component: Bounce },
                { name: "Ripple", component: Ripple },
                { name: "Roller", component: Roller },
                { name: "Grid", component: Grid },
                { name: "Wave", component: Wave },
              ].map(({ name, component: Component }) => (
                <div
                  key={name}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <h3 style={{ color: "white", marginBottom: "1rem" }}>
                    {name}
                  </h3>
                  <div
                    style={{
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* @ts-ignore */}
                    <Component color="#ffffff" size={40} speed={1} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Loader */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "2rem" }}>
              Progress Loader
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* @ts-ignore */}
              <Progress
                color="#ffffff"
                size={80}
                progress={progressValues[0]}
              />
              {/* @ts-ignore */}
              <Progress
                color="#FFC107"
                size={80}
                progress={progressValues[1]}
              />
              {/* @ts-ignore */}
              <Progress
                color="#FF5722"
                size={80}
                progress={progressValues[2]}
              />
              {/* @ts-ignore */}
              <Progress
                color="#E91E63"
                size={80}
                progress={progressValues[3]}
              />
            </div>
          </div>

          {/* Dynamic Loader */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "2rem" }}>
              Dynamic Loader
            </h2>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* @ts-ignore */}
              <Loader type="spinner" color="#ffffff" size={50} />
              {/* @ts-ignore */}
              <Loader type="ring" color="#FFC107" size={50} />
              {/* @ts-ignore */}
              <Loader type="dots" color="#FF5722" size={50} />
            </div>
          </div>

          {/* Custom Loader */}
          {/* Custom Loader Example */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "2rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "2rem" }}>
              Custom Loader Example
            </h2>
            <div style={{ textAlign: "center" }}>
              {/* @ts-ignore */}
              <CustomHeartLoader size={50} speed={1.5} />
            </div>
          </div>

          {/* Interactive Custom Loader Playground */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "2rem",
              marginTop: "2rem",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "1rem" }}>
              🛠️ Create Your Own Loader (Experimental, May not work)
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem" }}>
              Write your custom loader code below. Changes will be reflected in
              real-time!
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 300px",
                gap: "2rem",
                alignItems: "start",
              }}
            >
              {/* Controls */}
              <div>
                <div style={{ marginBottom: "2rem" }}>
                  <label
                    style={{
                      color: "white",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Loader Template:
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    <option value="spinner">Border Spinner</option>
                    <option value="conicGradient">Conic Gradient</option>
                    <option value="bouncingBars">Bouncing Bars</option>
                    <option value="ripple">Ripple Effect</option>
                    <option value="pulse">Pulse</option>
                    <option value="squares">Fading Squares</option>
                    <option value="image">Custom Image</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        color: "white",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Color:
                    </label>
                    <input
                      type="color"
                      value={loaderColor}
                      onChange={(e) => setLoaderColor(e.target.value)}
                      style={{
                        width: "100%",
                        height: "48px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        color: "white",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Size: {loaderSize}px
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={loaderSize}
                      onChange={(e) => setLoaderSize(Number(e.target.value))}
                      style={{
                        width: "100%",
                        height: "48px",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        color: "white",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Speed: {loaderSpeed}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={loaderSpeed}
                      onChange={(e) => setLoaderSpeed(Number(e.target.value))}
                      style={{
                        width: "100%",
                        height: "48px",
                      }}
                    />
                  </div>
                </div>

                {/* Image URL input for image loader */}
                {selectedTemplate === "image" && (
                  <div style={{ marginTop: "1rem" }}>
                    <label
                      style={{
                        color: "white",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      Image URL:
                    </label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Enter image URL (PNG, SVG, etc.)"
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "14px",
                      }}
                    />
                    <div
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      💡 Try: Icons, logos, or animated GIFs. Make sure the URL
                      is publicly accessible.
                    </div>
                  </div>
                )}

                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                  }}
                >
                  <h4 style={{ color: "white", margin: "0 0 1rem 0" }}>
                    Usage Code:
                  </h4>
                  <pre
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "12px",
                      overflow: "auto",
                      margin: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {(() => {
                      const getTemplateCode = () => {
                        switch (selectedTemplate) {
                          case "spinner":
                            return `import { createLoader } from 'react-easy-loaders';

const BorderSpinner = createLoader(({ color, size, speed }) => (
  <div
    style={{
      width: size,
      height: size,
      border: \`3px solid \${color}30\`,
      borderTop: \`3px solid \${color}\`,
      borderRadius: "50%",
      animation: \`spin \${1 / speed}s linear infinite\`,
    }}
  />
));

// Add this CSS to your global styles:
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

// Usage:
<BorderSpinner color="${loaderColor}" size={${loaderSize}} speed={${loaderSpeed}} />`;

                          case "conicGradient":
                            return `import { createLoader } from 'react-easy-loaders';

const ConicGradientLoader = createLoader(({ color, size, speed }) => (
  <div
    style={{
      width: size,
      height: size,
      background: \`conic-gradient(\${color}, \${color}80, transparent, \${color})\`,
      borderRadius: "50%",
      animation: \`spin \${1 / speed}s linear infinite\`,
    }}
  />
));

// Add this CSS to your global styles:
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

// Usage:
<ConicGradientLoader color="${loaderColor}" size={${loaderSize}} speed={${loaderSpeed}} />`;

                          case "bouncingBars":
                            return `import { createLoader } from 'react-easy-loaders';

const BouncingBars = createLoader(({ color, size, speed }) => (
  <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: size }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: size / 4,
          height: size * 0.8,
          background: color,
          borderRadius: "2px",
          animation: \`bounce \${1.2 / speed}s ease-in-out \${i * 0.1}s infinite\`,
          transformOrigin: "bottom",
        }}
      />
    ))}
  </div>
));

// Add this CSS to your global styles:
/*
@keyframes bounce {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.3); }
}
*/

// Usage:
<BouncingBars color="${loaderColor}" size={${loaderSize}} speed={${loaderSpeed}} />`;

                          case "ripple":
                            return `import { createLoader } from 'react-easy-loaders';

const RippleLoader = createLoader(({ color, size, speed }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: \`2px solid \${color}\`,
          borderRadius: "50%",
          animation: \`ripple \${2 / speed}s ease-out \${i * 0.6}s infinite\`,
        }}
      />
    ))}
  </div>
));

// Add this CSS to your global styles:
/*
@keyframes ripple {
  0% { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(1); opacity: 0; }
}
*/

// Usage:
<RippleLoader color="${loaderColor}" size={${loaderSize}} speed={${loaderSpeed}} />`;

                          case "pulse":
                            return `import { createLoader } from 'react-easy-loaders';

const PulseLoader = createLoader(({ color, size, speed }) => (
  <div
    style={{
      width: size,
      height: size,
      background: color,
      borderRadius: "50%",
      animation: \`pulse \${1.5 / speed}s ease-in-out infinite\`,
    }}
  />
));

// Add this CSS to your global styles:
/*
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}
*/

// Usage:
<PulseLoader color="${loaderColor}" size={${loaderSize}} speed={${loaderSpeed}} />`;

                          case "squares":
                            return `import { createLoader } from 'react-easy-loaders';

const FadingSquares = createLoader(({ color, size, speed }) => (
  <div
    style={{
      display: "grid",
      gridTemplate: "repeat(2, 1fr) / repeat(2, 1fr)",
      gap: "4px",
      width: size,
      height: size,
    }}
  >
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          background: color,
          borderRadius: "2px",
          animation: \`fade \${2 / speed}s ease-in-out \${i * 0.3}s infinite\`,
        }}
      />
    ))}
  </div>
));

// Add this CSS to your global styles:
/*
@keyframes fade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
*/

// Usage:
<FadingSquares color="${loaderColor}" size={${loaderSize}} speed={${loaderSpeed}} />`;

                          case "image":
                            return `import { createLoader } from 'react-easy-loaders';

const CustomImageLoader = createLoader(({ size, speed }) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundImage: 'url(${imageUrl})',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      animation: \`spin \${1 / speed}s linear infinite\`,
    }}
  />
));

// Add this CSS to your global styles:
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

// Usage:
<CustomImageLoader size={${loaderSize}} speed={${loaderSpeed}} />`;

                          default:
                            return `// Select a template to see the code`;
                        }
                      };

                      return getTemplateCode();
                    })()}
                  </pre>
                </div>
              </div>

              {/* Preview */}
              <div>
                <label
                  style={{
                    color: "white",
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Live Preview:
                </label>
                <div
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "2rem",
                    textAlign: "center",
                    minHeight: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    {/* @ts-ignore */}
                    <CustomLoaderComponent
                      color={loaderColor}
                      size={loaderSize}
                      speed={loaderSpeed}
                    />
                    <div
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        marginTop: "1rem",
                        fontSize: "12px",
                      }}
                    >
                      {selectedTemplate.charAt(0).toUpperCase() +
                        selectedTemplate.slice(1)}{" "}
                      Loader
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                  }}
                >
                  <h4
                    style={{
                      color: "white",
                      margin: "0 0 0.5rem 0",
                      fontSize: "14px",
                    }}
                  >
                    Template Features:
                  </h4>
                  <div
                    style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}
                  >
                    {selectedTemplate === "spinner" &&
                      "• Classic border spinner with transparent top"}
                    {selectedTemplate === "conicGradient" &&
                      "• Modern CSS conic gradient animation"}
                    {selectedTemplate === "bouncingBars" &&
                      "• Three bars with staggered bounce animation"}
                    {selectedTemplate === "ripple" &&
                      "• Expanding circles with fade-out effect"}
                    {selectedTemplate === "pulse" &&
                      "• Scaling circle with opacity changes"}
                    {selectedTemplate === "squares" &&
                      "• 2x2 grid with sequential fade animation"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Standalone Overlay */}
          {/* @ts-ignore */}
          <LoaderOverlay
            open={overlayOpen}
            loader={
              <>
                {/* @ts-ignore */}
                <Ring color="#ffffff" size={60} />
              </>
            }
            message="Standalone overlay loader..."
            backdropColor="rgba(0,0,0,0.7)"
          />

          {/* Footer */}
        </div>
      )}

      {activeTab === "guide" && (
        <div
          style={{
            padding: "2rem",
            maxWidth: "1000px",
            margin: "0 auto",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              📦 Installation
            </h2>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>npm</h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                npm install react-easy-loaders
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>yarn</h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                yarn add react-easy-loaders
              </div>
            </div>

            <div>
              <h3 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>pnpm</h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                pnpm add react-easy-loaders
              </div>
            </div>
          </div>

          {/* Basic Usage */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🚀 Basic Usage
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFC107", marginBottom: "1rem" }}>
                1. Import Individual Loaders
              </h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "auto",
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "#ffffff",
                  }}
                >
                  {`import React from 'react';
import { Spinner, Ring, Dots } from 'react-easy-loaders';

function MyComponent() {
  return (
    <div>
      <Spinner color="#ffffff" size={50} />
      <Ring color="#FF5722" size={60} />
      <Dots color="#2196F3" size={40} />
    </div>
  );
}`}
                </pre>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFC107", marginBottom: "1rem" }}>
                2. Use Generic Loader Component
              </h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "auto",
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "#ffffff",
                  }}
                >
                  {`import React from 'react';
import { Loader } from 'react-easy-loaders';

function MyComponent() {
  return (
    <div>
      <Loader type="spinner" color="#ffffff" size={50} />
      <Loader type="ring" color="#FF5722" size={60} />
      <Loader type="dots" color="#2196F3" size={40} />
    </div>
  );
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 style={{ color: "#FFC107", marginBottom: "1rem" }}>
                3. With LoaderProvider (Global Theming)
              </h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "auto",
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "#ffffff",
                  }}
                >
                  {`import React from 'react';
import { LoaderProvider, Spinner, Ring } from 'react-easy-loaders';

function App() {
  return (
    <LoaderProvider value={{ color: "#ffffff", size: 50, speed: 1 }}>
      <div>
        {/* All loaders will inherit the theme */}
        <Spinner />
        <Ring />
      </div>
    </LoaderProvider>
  );
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Available Loaders */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🎨 Available Loaders
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {[
                "Spinner",
                "Ring",
                "Dots",
                "Bars",
                "Pulse",
                "Grid",
                "Wave",
                "Bounce",
                "Roller",
                "DualRing",
                "Ripple",
                "Progress",
              ].map((loader) => (
                <div
                  key={loader}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "monospace",
                      color: "#FFC107",
                      fontWeight: "bold",
                    }}
                  >
                    {loader}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Props API */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ⚙️ Props API
            </h2>

            <div
              style={{
                background: "rgba(0,0,0,0.3)",
                padding: "1.5rem",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <pre
                style={{ margin: 0, whiteSpace: "pre-wrap", color: "#ffffff" }}
              >
                {`interface LoaderBaseProps {
  color?: string;     // Default: "#ffffff"
  size?: number;      // Default: 40 (pixels)
  speed?: number;     // Default: 1 (animation speed multiplier)
}

// Progress loader has additional prop
interface ProgressProps extends LoaderBaseProps {
  progress?: number;  // Default: 50 (0-100)
}

// Generic Loader component
interface LoaderProps extends LoaderBaseProps {
  type: 'spinner' | 'ring' | 'dots' | 'bars' | 'pulse' | 
        'grid' | 'wave' | 'bounce' | 'roller' | 'dualring' | 
        'ripple' | 'progress';
}`}
              </pre>
            </div>
          </div>

          {/* Advanced Usage */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🔥 Advanced Usage
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFC107", marginBottom: "1rem" }}>
                Loading Overlay
              </h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "auto",
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "#ffffff",
                  }}
                >
                  {`import React, { useState } from 'react';
import { LoaderOverlay, Ring } from 'react-easy-loaders';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncAction = async () => {
    setIsLoading(true);
    try {
      await someAsyncOperation();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAsyncAction}>
        Start Loading
      </button>
      
      <LoaderOverlay
        isVisible={isLoading}
        loader={<Ring color="#ffffff" size={60} />}
        message="Processing..."
      />
    </div>
  );
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 style={{ color: "#FFC107", marginBottom: "1rem" }}>
                Custom Loader with createLoader
              </h3>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "auto",
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    color: "#ffffff",
                  }}
                >
                  {`import React from 'react';
import { createLoader } from 'react-easy-loaders';

const CustomLoader = createLoader(({ color = '#ffffff', size = 40 }) => (
  <div style={{
    width: size,
    height: size,
    border: \`3px solid \${color}30\`,
    borderTop: \`3px solid \${color}\`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }} />
));

function MyComponent() {
  return <CustomLoader color="#FF5722" size={50} />;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Features */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ✨ Features
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h4 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>
                  🎯 TypeScript Support
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  Full TypeScript support with proper type definitions
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h4 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>
                  🎨 Customizable
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  Easily customize colors, sizes, and animation speeds
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h4 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>
                  📦 Lightweight
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  Minimal bundle size with tree-shaking support
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h4 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>
                  🔧 Easy Integration
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  Simple API with multiple usage patterns
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h4 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>
                  🌈 Theme Support
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  Global theming with LoaderProvider
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h4 style={{ color: "#FFC107", marginBottom: "0.5rem" }}>
                  🚀 12 Built-in Loaders
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  Variety of beautiful, animated loading components
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          marginTop: "4rem",
          padding: "2rem",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        <p style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>
          Made with ❤️ by <strong>Devesh Lashkari</strong>
        </p>
        <p style={{ margin: "0 0 1rem 0" }}>
          Open source React loading components library with TypeScript support
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://github.com/DeveshLashkari"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Profile
          </a>
          <a
            href="https://linkedin.com/in/deveshlashkari"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://twitter.com/devesh_lashkari"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <>
      {/* @ts-ignore */}
      <LoaderProvider value={{ color: "#ffffff", size: 40, speed: 1 }}>
        <LoaderDemo />
      </LoaderProvider>
    </>
  );
};

export default App;
