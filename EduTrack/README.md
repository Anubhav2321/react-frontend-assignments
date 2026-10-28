# AttendEase — Student Attendance Management System

**AttendEase** is a comprehensive, production-grade academic attendance management system developed with **React, Vite, and Redux Toolkit**. Designed to model institutional campus operations, AttendEase centralizes student roster administration, multi-period lecture session tracking, compliance analytics, and CSV reporting.

> **Architecture Notice (Frontend-Only):** AttendEase is an educational, frontend-only single-page application. All application state is stored locally within the browser using HTML5 `localStorage` and managed centrally via Redux Toolkit. Asynchronous operations are simulated through a realistic client-side mock service layer. No remote backend server or centralized database is connected.

---

## 1. Key Features

- **Student Directory Administration:**
  - Add, edit, activate/deactivate, and delete student records.
  - Automatic validation of required fields, email formatting, and unique student IDs.
  - Multi-criteria filtering by Department, Semester, Section, and Status with live search.
  - Pagination for high-density academic cohorts.

- **Curriculum & Course Management:**
  - Course catalog with Course Codes, Course Names, Departments, Semesters, Credit units, and Faculty Instructors.
  - Multi-section assignments (Sections A, B, C).
  - Validation to avoid duplicate course codes.

- **Class Attendance Tracking:**
  - Session filtering by Attendance Date (canonical `YYYY-MM-DD`), Subject, Semester, and Section.
  - Displays only registered, eligible students for the selected class session.
  - Support for 4 institutional attendance statuses:
    - **P (Present):** Attendance credit earned.
    - **A (Absent):** Unexcused absence.
    - **PL (Internship Placed):** Off-campus approved corporate internship (excluded from countable sessions).
    - **E (Official Engagement):** College representation in sports/academic symposiums (excluded from countable sessions).
  - "Mark All Present" batch action with confirmation dialog.
  - Synchronous draft editing with asynchronous batch persistence.
  - **Duplicate Prevention:** Unique session records keyed by `studentId_subjectId_date`. Re-opening an existing session pre-loads saved marks and updates records in place.

- **Executive Analytics Dashboard:**
  - 7 live metric cards computed via memoized selectors:
    - Total Enrolled Students
    - Total Present (P)
    - Total Absent (A)
    - Total Internship Placed (PL)
    - Total Official Engagement (E)
    - Overall Attendance Percentage
    - Students Below Compliance Threshold
  - Interactive Recharts Visualizations:
    - Status Distribution Donut Chart (`P`, `A`, `PL`, `E`).
    - Campus Attendance Trend Area Chart across dates.
    - Subject-wise Attendance Percentage Bar Chart.
    - Department-wise Attendance Comparison Bar Chart.
  - Low-attendance alert banner highlighting at-risk students.
  - Recent class session activity feed.

- **Auditing & CSV Reporting:**
  - Daily, Monthly, and Custom Date-Range reporting modes.
  - Multi-dimensional filters (Student, Subject, Department, Semester, Section).
  - Column sorting by Date, Student ID, or Name.
  - **Secure CSV Export:** Formula injection mitigation (DDE sanitization) with RFC 4180 quote escaping and automated browser download.

- **Configurable Settings & Demo Data:**
  - Configurable minimum attendance threshold (default **45%**).
  - Client-side browser storage diagnostic and footprint meter.
  - One-click demo dataset reset with confirmation.

---

## 2. Technology Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 & Vite 5 |
| **Language** | JavaScript (ESNext, JSX) |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`) & React Redux (`react-redux`) |
| **Routing** | React Router DOM v6 |
| **Visualizations** | Recharts 2 |
| **Icons** | Lucide React |
| **Styling** | Custom CSS Design System (`index.css`) with CSS Variables |
| **Testing** | Vitest, React Testing Library, `@testing-library/jest-dom` |
| **Persistence** | HTML5 Browser LocalStorage with automated Redux subscriber |

---

## 3. Project Directory Structure

```
EduTrack/
├── public/
├── src/
│   ├── api/
│   │   ├── mockStudentApi.js           # Asynchronous student API simulation
│   │   └── mockAttendanceApi.js        # Asynchronous attendance session API simulation
│   ├── app/
│   │   ├── store.js                    # Redux Toolkit store with persistence subscriber
│   │   ├── hooks.js                    # Typed useAppDispatch and useAppSelector hooks
│   │   └── middleware/
│   │       └── loggerMiddleware.js     # Redux action logger with PII sanitization
│   ├── components/
│   │   ├── common/
│   │   │   ├── ChartCard.jsx           # Reusable wrapper for Recharts with empty states
│   │   │   ├── ConfirmationDialog.jsx  # Accessible modal confirmation
│   │   │   ├── EmptyState.jsx          # Visual empty dataset placeholder
│   │   │   ├── LoadingSkeleton.jsx     # Pulse loading placeholder
│   │   │   ├── Pagination.jsx          # Table pagination bar
│   │   │   ├── StatusBadge.jsx         # P/A/PL/E color-coded status badges
│   │   │   ├── SummaryCard.jsx         # Metric card with badge, icon, and subtext
│   │   │   └── ToastNotification.jsx   # Success/Error/Info alert toast
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx           # Main scaffold container
│   │   │   ├── Sidebar.jsx             # Collapsible navigation drawer
│   │   │   └── Topbar.jsx              # Header with date, threshold badge, and title
│   │   ├── students/
│   │   │   └── StudentFormModal.jsx    # Add/Edit student form with validation
│   │   └── subjects/
│   │       └── SubjectFormModal.jsx    # Add/Edit subject form with validation
│   ├── data/
│   │   └── seedData.js                 # Seed dataset: 21+ students, 6 subjects, multi-day records
│   ├── features/
│   │   ├── attendance/
│   │   │   └── attendanceSlice.js      # Attendance records, session batch thunk, reducers
│   │   ├── filters/
│   │   │   └── filtersSlice.js         # Student, session, report, and subject filter state
│   │   ├── preferences/
│   │   │   └── preferencesSlice.js     # Attendance threshold, theme, view preferences
│   │   ├── students/
│   │   │   └── studentsSlice.js        # Entity adapter normalized state, async thunks
│   │   └── subjects/
│   │       └── subjectsSlice.js        # Course catalog state and actions
│   ├── pages/
│   │   ├── AttendancePage.jsx          # Session marking, batch actions, and session stats
│   │   ├── DashboardPage.jsx           # Executive overview, Recharts charts, risk banner
│   │   ├── ReportsPage.jsx             # Daily/monthly auditing, sorting, and CSV export
│   │   ├── SettingsPage.jsx            # Threshold configuration and demo data reset
│   │   ├── StudentsPage.jsx            # Student roster, search, pagination, active toggle
│   │   └── SubjectsPage.jsx            # Course catalog, credit hours, instructor details
│   ├── selectors/
│   │   ├── attendanceSelectors.js      # Individual student stats map, threshold filters
│   │   ├── dashboardSelectors.js       # Recharts datasets, executive metrics, recent feed
│   │   ├── reportSelectors.js          # Filtered audit records, CSV export mappings
│   │   └── studentSelectors.js         # Search/filter students, session eligible roster
│   ├── test/
│   │   └── setup.js                    # Jest-DOM matchers setup for Vitest
│   ├── utils/
│   │   ├── attendanceCalculations.js   # Pure calculation policy, formula, status configs
│   │   ├── csvExport.js                # RFC 4180 generator and formula injection sanitizer
│   │   ├── dateUtils.js                # Canonical YYYY-MM-DD date utilities
│   │   └── storage.js                  # LocalStorage schema serialization & recovery
│   ├── App.jsx                         # React Router routes and initial async data dispatch
│   ├── index.css                       # Design system, responsive rules, status colors
│   └── main.jsx                        # React root entry with Provider and BrowserRouter
├── tests/
│   ├── asyncThunks.test.js             # Async thunk dispatch, success, and error tests
│   ├── calculations.test.js            # Pure formula, zero-denominator, and PL/E exclusion tests
│   ├── components.test.jsx             # UI component, modal validation, and CSV tests
│   ├── reducers.test.js                # State mutations, entity adapter, duplicate prevention
│   └── selectors.test.js               # Memoized selectors, search, and dashboard tests
├── package.json
├── vite.config.js
└── README.md
```

---

## 4. Attendance Calculation Policy

AttendEase enforces a centralized academic policy:

$$\text{Countable Sessions} = \text{Present (P)} + \text{Absent (A)}$$

$$\text{Attendance Percentage} = \left(\frac{\text{Present (P)}}{\text{Countable Sessions}}\right) \times 100$$

### Status Rules:
1. **Present (`P`):** Student attended class. Contributes +1 to numerator and +1 to denominator.
2. **Absent (`A`):** Unexcused absence. Contributes 0 to numerator and +1 to denominator.
3. **Internship Placed (`PL`):** Officially sanctioned off-campus placement. Excluded from countable sessions (does not penalize student).
4. **Official Engagement (`E`):** University-authorized extracurricular representation (symposium, inter-college sports). Excluded from countable sessions.
5. **Zero Countable Sessions:** If a student only has `PL` and `E` records, or has no recorded sessions, their percentage evaluates to `null` and displays as `N/A`.
6. **Threshold Flagging:** Students whose percentage is strictly below the configured threshold (default **45%**) are flagged as low attendance. Students with `N/A` are excluded from the warning list.

---

## 5. Redux Toolkit Architecture

- **`createEntityAdapter` for Students:**
  Normalized structure (`ids` and `entities`) sorted by `studentId`. Provides $O(1)$ lookups and clean updates.
- **`createAsyncThunk` for Service Layer:**
  Handles `pending`, `fulfilled`, and `rejected` states with realistic delay simulation and error rejection.
- **Memoized Selectors (`createSelector`):**
  Derived totals, filtered lists, Recharts chart points, and CSV matrices are calculated only when source slices mutate.
- **Custom Logger Middleware:**
  Logs action types and sanitized payload summaries in development. Prevents personal identifiable information (PII such as student emails) from being printed to the console.
- **LocalStorage State Persistence:**
  The Redux store subscribes to state changes and debounces serialization into browser storage under the key `attendease_state_v1`.

---

## 6. Development & Testing Commands

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Run Vitest Automated Test Suite
```bash
npm run test
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 7. Automated Test Suite Results

All 35 automated unit and integration tests execute successfully:

```
 ✓ tests/calculations.test.js (8 tests)
 ✓ tests/asyncThunks.test.js (5 tests)
 ✓ tests/reducers.test.js (9 tests)
 ✓ tests/selectors.test.js (6 tests)
 ✓ tests/components.test.jsx (7 tests)

 Test Files  5 passed (5)
      Tests  35 passed (35)
```

- **Calculations Suite:** Verifies formula accuracy, zero-denominator handling, PL/E denominator exclusion, and threshold boundaries.
- **Reducers Suite:** Tests entity adapter operations, student deactivation/activation, batch session upserts, and duplicate-prevention rules.
- **Selectors Suite:** Tests multi-criteria search, session eligible student rosters, live dashboard metrics, and low-attendance filters.
- **Async Thunks Suite:** Tests mock API integration, network simulation, loading states, and rejection on duplicate student IDs.
- **Components Suite:** Tests status badges, summary cards, student form field validation, and CSV export generation with formula sanitization.

---

## 8. CSV Export Specification

The attendance reports feature includes an RFC 4180-compliant CSV generator with formula injection protection:
- **DDE / Formula Sanitization:** Any cell beginning with `=`, `+`, `-`, `@`, `\t`, or `\r` is automatically prefixed with a single quotation mark (`'`) to prevent formula execution in Microsoft Excel or Google Sheets.
- **Escaping:** Commas, double quotes, and newlines are safely quoted and escaped.
- **Columns Exported:** Student ID, Student Name, Department, Semester, Section, Subject Code, Subject Name, Date, Attendance Status, and Overall Attendance %.
- **Real File Download:** Uses `Blob` with UTF-8 BOM encoding and automated browser trigger.

---

## 9. Known Limitations & Future Roadmap

1. **Browser Storage Scope:** Stored data is specific to the current browser profile. Clearing browser cache or site data resets the demo environment.
2. **Backend API Readiness:** The service layer (`mockStudentApi.js` and `mockAttendanceApi.js`) is organized with standard async Promise signatures and can be easily swapped for Axios or `fetch` calls to a REST/GraphQL backend in a future release.
3. **Multi-Tenant Authentication:** As this is an academic frontend demonstration, role-based authentication (Faculty vs Dean vs Student) can be added when integrated with an OAuth 2.0 / JWT provider.

