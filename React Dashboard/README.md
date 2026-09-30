# Orderly Analytics

## Project Description

Orderly Analytics is a complete, polished, production-quality React-based order management analytics dashboard. This frontend-only application displays crucial business metrics and provides interactive data visualization without needing a complex backend. It is designed with a premium "Dark Glassmorphism" UI, resembling modern SaaS platforms.

## Features

* Revenue Widget
* Sales Widget
* Orders Widget
* Customers Widget
* Recent Orders Table
* Revenue & Sales Line Chart
* Order Status Pie Chart
* Date Range Filter
* Category Filter
* Status Filter
* Material UI Styling & Theme
* Recharts Integration
* Responsive Design
* Dark Glassmorphism UI

## Technologies

* React
* Vite
* JavaScript
* Material UI (MUI)
* Recharts

## How to Run

1. Make sure you have Node.js installed.
2. Clone or download this project.
3. Open your terminal in the project folder and run:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## Dashboard Concepts

* **KPI Widgets**: Key Performance Indicators (Total Revenue, Total Sales, Total Orders, Total Customers) are calculated dynamically from the filtered order data. Revenue is the sum of order amounts. Sales is the total quantity of items sold. Customers is the number of unique customers.
* **Line Chart**: Uses Recharts to plot the revenue and sales trend over the selected period.
* **Pie Chart**: Visualizes the distribution of order statuses (Completed, Processing, Pending, Cancelled).
* **Tables**: Displays the latest 10 transactions with styled status chips.
* **Filtering**: Users can filter by Date Range, Category, and Status. The filters use React State (`useState`) to store selections and `useMemo` to derive a new filtered dataset, which updates all widgets, charts, and tables without mutating the original mock data.
* **React State & Derived Data**: A single source of truth for filters is maintained in `App.jsx`, and derived data flows down to the components.
* **Responsive Design**: The sidebar operates as a permanent drawer on desktop and a temporary slide-out drawer on mobile devices, ensuring the layout adapts seamlessly to different screen sizes.

---
*Developed for College Assignment.*
