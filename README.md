## RAVEN GP — The Official Race Week Experience

<p align="center">
  <img src="./src/assets/racing-bg-1.jpg" alt="RAVEN GP Cinematic Header" width="100%" style="border-radius:12px;">
</p>

**Lights out and away we go.** 

Welcome to **RAVEN GP** — the official digital paddock for our Bosch Future Mobility Challenge entry. This isn't just a website; it's a high-performance telemetry interface designed to bring the adrenaline of the track to your screen.

Built with the precision of a Formula 1 team, RAVEN GP combines cinematic visuals, race-day atmosphere, and cutting-edge web technology to deliver the ultimate reveal.

## 🌍 Global System Architecture

```mermaid
graph TD
    %% Styling
    classDef infra fill:#2d3748,stroke:#4a5568,color:#fff
    classDef web fill:#2b6cb0,stroke:#63b3ed,color:#fff
    classDef computer fill:#1A4024,stroke:#3D9955,color:#fff
    classDef brain fill:#6b46c1,stroke:#b794f4,color:#fff
    classDef perception fill:#805ad5,stroke:#b794f4,color:#fff
    classDef embedded fill:#744210,stroke:#d69e2e,color:#fff
    classDef sim fill:#2c7a7b,stroke:#4fd1c5,color:#fff
    classDef docs fill:#4a5568,stroke:#a0aec0,color:#fff

    subgraph "Infrastructure & Tools"
        CLI[raven-infrastructure CLI]:::infra
        DOCS[raven-documentation Sphinx]:::docs
    end

    subgraph "Presentation & User Interfaces"
        FUTURA[axel-launch-futura<br>React/Vite Official Web]:::web
        DASH[raven-computer<br>Remote Dashboard / Telemetry]:::computer
    end

    subgraph "High-Level Control (Raspberry Pi)"
        BRAIN[raven-brain-stack<br>Python Multiprocessing]:::brain
        
        subgraph "Perception Pipeline"
            CAMERA[Camera / Frame Receiver]:::perception
            LANEDET[Lane Detection<br>OpenCV IPM & Polyfit]:::perception
            SIGNDET[Sign Detection<br>YOLOv8 + Filters]:::perception
            LOCALIZATION[Localization<br>Odometry & Map Graph]:::perception
            CAMERA --> LANEDET
            CAMERA --> SIGNDET
        end
        
        PLANNER[Planner / FSM<br>Decision Logic]:::brain
        SERIAL[Serial Communication<br>Asynchronous UART]:::brain

        LANEDET -->|Lateral Offset| PLANNER
        SIGNDET -->|Sign Labels| PLANNER
        LOCALIZATION <-->|Pose & Drift Correct| PLANNER
        PLANNER -->|Speed & Steer Commands| SERIAL
    end

    subgraph "Low-Level Control (STM32/RP2040)"
        EMBEDDED[raven-embedded-control C++]:::embedded
        PID[Speed PID & Steering MPC]:::embedded
        SAFETY[Dead Man Switch]:::embedded

        EMBEDDED --- PID
        EMBEDDED --- SAFETY
    end

    subgraph "Simulation"
        SIM[raven-sim Gazebo ROS1]:::sim
    end

    %% Connections
    CLI -.->|"Deploys/Manages"| BRAIN
    CLI -.->|"Flashes"| EMBEDDED
    DASH <-->|"Socket.IO / Telemetry"| BRAIN
    SERIAL <-->|"USB Serial (#cmds / @telemetry)"| EMBEDDED
    SIM -.->|"Provides Camera / ROS / Telemetry"| BRAIN
    SIM <-->|"Simulated Server"| DASH
```

## Grid Preview

<div style="display:flex; gap:16px; flex-wrap:wrap; margin:24px 0;">
  
  <div style="flex:1; min-width:200px; background:#fff; color:#111; border-radius:10px; padding:18px; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
    <h3 style="margin:0 0 8px 0; font-size:1.25rem; color:#000;">🏎️ Race Day Atmosphere</h3>
    <p style="margin:0; color:#4b5563; font-size:14px; line-height:1.5;">
      Feel the tension build with our custom <strong>Starting Lights Sequence</strong> and immersive, high-octane video backgrounds. It's not just a landing page; it's the warm-up lap.
    </p>
  </div>

  <div style="flex:1; min-width:200px; background:#fff; color:#111; border-radius:10px; padding:18px; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
    <h3 style="margin:0 0 8px 0; font-size:1.25rem; color:#000;">🌍 World Championship (i18n)</h3>
    <p style="margin:0; color:#4b5563; font-size:14px; line-height:1.5;">
      Competing on the global stage. Seamless, route-based localization for <strong>English</strong>, <strong>Romanian</strong>, and <strong>Arabic</strong> means we speak the language of speed, everywhere.
    </p>
  </div>

  <div style="flex:1; min-width:200px; background:#fff; color:#111; border-radius:10px; padding:18px; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
    <h3 style="margin:0 0 8px 0; font-size:1.25rem; color:#000;">⚡ Engineering Excellence</h3>
    <p style="margin:0; color:#4b5563; font-size:14px; line-height:1.5;">
      Under the hood: a turbocharged <strong>Vite</strong> engine, <strong>React</strong> chassis, and <strong>Tailwind</strong> aerodynamics. Zero drag, maximum performance.
    </p>
  </div>

</div>

## Telemetry & Specs

- **Cinematic Visuals**: Full-screen atmospherics (`racing-bg-1.jpg`, `racing-bg-2.jpg`) that put you in the driver's seat.
- **Precision UI**: Components honed with `shadcn/ui` and `framer-motion` for buttery smooth cornering (transitions).
- **Global Circuit Support**: Smart URL routing (`/:lng/...`) for instant language adaptation.
- **Paddock Sounds**: Integrated audio player to set the race-day mood.
- **Mobile Aero Package**: Fully responsive design that performs on any screen size.

## Technical Scrutiny (Development)

Just like the FIA checks every car, we ensure code quality before hitting the track.

- **Linting**: `npm run lint` — Checks for aerodynamic flaws in the code (ESLint).
- **Formatting**: Engineered with Prettier for clean airflow.
- **Build**: `npm run build` — The final race configuration.

## Pit Wall (Code Map)

- `src/App.tsx` — Race Control: Routing and main logic.
- `src/components/F1StartingLights.tsx` — The Launch Sequence: Essential timing animation.
- `src/locales/` — Team Radio: Translation files for clear communication.
- `src/assets/` — livery: High-res assets and textures.
- `src/pages/` — Sectors: Individual page components.

## Engine Start (Quick Run)

Get the car out of the garage:

```bash
git clone <YOUR_GIT_URL>
cd axel-launch-futura
npm install
npm run dev
```

Check telemetry at http://localhost:8080.

### Qualifying Setup (Build)

```bash
npm run build
npm run preview
```

## The Pit Crew

Built by the **RAVEN GP** engineering team. 

- **Frontend Engineers**: Crafting the user experience.
- **Designers**: Ensuring the livery looks fast standing still.
- **Strategy**: Coordinating the reveal for maximum impact.

## Join the Team

1.  **Fork** the repository.
2.  **Create** a feature branch (`git checkout -b feature/new-aero-package`).
3.  **Commit** your upgrades.
4.  **Push** to the branch and open a Pull Request.

## License

PROPRIETARY TECH of **RAVEN GP**. Part of the **Bosch Future Mobility Challenge**.


