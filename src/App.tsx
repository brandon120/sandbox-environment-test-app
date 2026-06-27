import { useState } from "react";

type Metric = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
};

type Pulse = {
  label: string;
  value: string;
  sublabel: string;
};

const metrics: Metric[] = [
  {
    label: "Monthly Recurring Revenue",
    value: "$128.4K",
    delta: "+12.4% vs last month",
    direction: "up",
  },
  {
    label: "Active Customers",
    value: "4,382",
    delta: "+261 new signups",
    direction: "up",
  },
  {
    label: "Churn Rate",
    value: "2.3%",
    delta: "-0.6% improvement",
    direction: "down",
  },
  {
    label: "Avg. Response Time",
    value: "1m 48s",
    delta: "Support SLA 96%",
    direction: "up",
  },
];

const pulses: Pulse[] = [
  { label: "NPS", value: "62", sublabel: "Strong promoter momentum" },
  { label: "Expansion", value: "$34.1K", sublabel: "Upsell pipeline" },
  { label: "Trial-to-paid", value: "47%", sublabel: "+9 pts vs goal" },
];

const roadmap = [
  {
    title: "Workspace automations",
    owner: "Violet Harper",
    eta: "Due Jul 02",
    status: "In QA",
  },
  {
    title: "Usage-based billing",
    owner: "Noah Singh",
    eta: "Due Jul 12",
    status: "Design lock",
  },
  {
    title: "APAC onboarding",
    owner: "Maya Ito",
    eta: "Due Aug 01",
    status: "Sprint ready",
  },
];

const activities = [
  {
    label: "Global infrastructure health",
    detail: "Latency holding under 140ms across all regions",
  },
  {
    label: "Finance review",
    detail: "FY27 forecast approved with 8.5% contingency",
  },
  {
    label: "Growth experiments",
    detail: "Variant C lifted activation by 4.8% week-over-week",
  },
];

const retentionTrend = [72, 74, 73, 76, 78, 79, 81, 82];
const revenueTrend = [92, 95, 97, 100, 104, 109, 117, 128];

export default function App() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  if (isWelcomeVisible) {
    return <WelcomePage onContinue={() => setIsWelcomeVisible(false)} />;
  }

  return (
    <main className="dashboard">
      <section className="top-bar">
        <div>
          <p className="eyebrow">Pulseboard</p>
          <h1>Revenue & Experience Command Center</h1>
        </div>
        <div className="top-actions">
          <button
            type="button"
            className="ghost"
            onClick={() => setIsWelcomeVisible(true)}
          >
            Welcome Page
          </button>
          <button type="button" className="primary">Testing button change</button>
        </div>
      </section>

      <section className="hero">
        <div>
          <h2>Next milestone: 150K MRR</h2>
          <p>
            Track growth, experience, and operations in a single pane.
            Everything here is wired for Railway deploys — preview, build, and ship
            without leaving the command center.
          </p>
          <div className="hero-pulses">
            {pulses.map((pulse) => (
              <article key={pulse.label}>
                <span>{pulse.label}</span>
                <strong>{pulse.value}</strong>
                <p>{pulse.sublabel}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <p className="eyebrow">Live deploy</p>
          <strong>Railway pipeline</strong>
          <ul>
            <li>
              <div>
                <span>Web</span>
                <p>Bundle optimized in 38s</p>
              </div>
              <status-badge data-status="success">Success</status-badge>
            </li>
            <li>
              <div>
                <span>Functions</span>
                <p>Provisioned 3 regions</p>
              </div>
              <status-badge data-status="pending">Shipping</status-badge>
            </li>
            <li>
              <div>
                <span>Data</span>
                <p>Migrations complete</p>
              </div>
              <status-badge data-status="success">Healthy</status-badge>
            </li>
          </ul>
          <button type="button">View deployment log</button>
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label}>
            <p>{metric.label}</p>
            <div>
              <strong>{metric.value}</strong>
              <span data-direction={metric.direction}>{metric.delta}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="panels">
        <article className="panel large">
          <header>
            <div>
              <p className="eyebrow">Retention</p>
              <h3>Enterprise cohorts</h3>
            </div>
            <button type="button" className="ghost">Download CSV</button>
          </header>
          <div className="chart">
            <TrendSparkline data={retentionTrend} label="Retention" suffix="%" />
            <div className="chart-summary">
              <strong>82%</strong>
              <span>+10 pts YoY</span>
            </div>
          </div>
          <ul className="chart-legend">
            <li>
              <span className="dot primary" />Global success pods
            </li>
            <li>
              <span className="dot secondary" />Regional pods
            </li>
          </ul>
        </article>

        <article className="panel stack">
          <header>
            <div>
              <p className="eyebrow">Roadmap</p>
              <h3>Launch queue</h3>
            </div>
            <button type="button" className="ghost">Reorder</button>
          </header>
          <ul>
            {roadmap.map((item) => (
              <li key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.owner}</p>
                </div>
                <div>
                  <span>{item.status}</span>
                  <p>{item.eta}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel medium">
          <header>
            <div>
              <p className="eyebrow">Revenue acceleration</p>
              <h3>Pipeline velocity</h3>
            </div>
            <button type="button" className="ghost">View playbook</button>
          </header>
          <div className="chart">
            <TrendSparkline data={revenueTrend} label="MRR" prefix="$" />
            <div className="chart-summary">
              <strong>$128K</strong>
              <span>+39% YoY</span>
            </div>
          </div>
          <p className="panel-note">
            Tracking weighted pipeline with conversion confidence layered over SDR
            coverage.
          </p>
        </article>

        <article className="panel stack">
          <header>
            <div>
              <p className="eyebrow">Signals</p>
              <h3>Ops activity</h3>
            </div>
            <button type="button" className="ghost">Mute alerts</button>
          </header>
          <ul>
            {activities.map((activity) => (
              <li key={activity.label}>
                <div>
                  <strong>{activity.label}</strong>
                  <p>{activity.detail}</p>
                </div>
                <status-badge data-status="success">Stable</status-badge>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

const welcomeFeatures = [
  {
    title: "Revenue intelligence",
    detail: "Track MRR, expansion, and churn with live, board-ready metrics.",
  },
  {
    title: "Customer signals",
    detail: "Surface NPS, activation, and retention trends as they move.",
  },
  {
    title: "Deploy health",
    detail: "Watch every Railway build, region, and migration in real time.",
  },
];

const welcomeStats = [
  { label: "Time to launch", value: "8 min", detail: "From clone to Railway" },
  { label: "Integrations", value: "6", detail: "Stripe, Segment, Postgres & more" },
  { label: "Alerts", value: "24/7", detail: "Latency + deploy guardrails" },
];

const welcomeMilestones = [
  {
    title: "Wire your data",
    detail: "Connect Stripe, Segment, and Postgres; sync in seconds with env vars.",
  },
  {
    title: "Tune scorecards",
    detail: "Map KPIs to every metric tile and export to exec-ready slides.",
  },
  {
    title: "Ship to prod",
    detail: "Railway pipeline deploys globally with automated health checks.",
  },
];

const welcomeDeployStatus = [
  { service: "Web", detail: "Bundle optimized in 38s", status: "success" as const },
  { service: "Functions", detail: "Provisioned 3 regions", status: "pending" as const },
  { service: "Data", detail: "Migrations complete", status: "success" as const },
];

function WelcomePage({ onContinue }: { onContinue: () => void }) {
  return (
    <main className="welcome">
      <section className="welcome-card">
        <div className="welcome-pill">Built for Railway teams</div>
        <p className="eyebrow">Welcome to Pulseboard</p>
        <h1>Testing Branch 🚀</h1>
        <p>
          Monitor revenue, customer signals, and deployment health from one command
          hub. Pulseboard ships with runnable data mocks, Railway manifests, and
          opinionated visuals so you can preview, build, and deploy within minutes.
        </p>

        <div className="welcome-stats">
          {welcomeStats.map((stat) => (
            <article key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>

        <section className="welcome-snapshot">
          <div className="welcome-snapshot-header">
            <h2>Live snapshot</h2>
            <p>Revenue, experience, and growth signals pulled from the command center.</p>
          </div>
          <div className="welcome-metric-strip">
            {metrics.map((metric) => (
              <article key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p data-direction={metric.direction}>{metric.delta}</p>
              </article>
            ))}
          </div>
          <div className="welcome-pulse-strip">
            {pulses.map((pulse) => (
              <article key={pulse.label}>
                <span>{pulse.label}</span>
                <strong>{pulse.value}</strong>
                <p>{pulse.sublabel}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="welcome-columns">
          <div>
            <h2>What you unlock</h2>
            <div className="welcome-features">
              {welcomeFeatures.map((feature) => (
                <article key={feature.title}>
                  <strong>{feature.title}</strong>
                  <p>{feature.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="welcome-journey">
            <h2>Launch checklist</h2>
            <ol>
              {welcomeMilestones.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <section className="welcome-ops">
          <div className="welcome-deploy">
            <h2>Deploy health</h2>
            <ul>
              {welcomeDeployStatus.map((item) => (
                <li key={item.service}>
                  <div>
                    <strong>{item.service}</strong>
                    <p>{item.detail}</p>
                  </div>
                  <status-badge data-status={item.status}>
                    {item.status === "success" ? "Healthy" : "Shipping"}
                  </status-badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="welcome-signals">
            <h2>Ops activity</h2>
            <ul>
              {activities.map((activity) => (
                <li key={activity.label}>
                  <strong>{activity.label}</strong>
                  <p>{activity.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="welcome-actions">
          <button type="button" className="primary" onClick={onContinue}>
            Enter Dashboard
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => alert("Hello World")}
          >
            Hello World
          </button>
          <button type="button" className="ghost">
            View Product Tour
          </button>
        </div>
      </section>
    </main>
  );
}

function TrendSparkline({
  data,
  label,
  prefix = "",
  suffix = "",
}: {
  data: number[];
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / (max - min || 1)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <figure className="sparkline">
      <figcaption>
        <span>{label}</span>
        <strong>
          {prefix}
          {data[data.length - 1]}
          {suffix}
        </strong>
      </figcaption>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={points} />
      </svg>
    </figure>
  );
}
