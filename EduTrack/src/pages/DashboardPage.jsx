import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  UserX,
  Briefcase,
  Award,
  Percent,
  AlertTriangle,
  CalendarCheck,
  UserPlus,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { useAppSelector } from '../app/hooks';
import {
  selectDashboardMetrics,
  selectStatusDistributionData,
  selectAttendanceTrendData,
  selectSubjectAttendanceData,
  selectDepartmentAttendanceData,
  selectRecentSessionsFeed,
} from '../selectors/dashboardSelectors';
import { selectLowAttendanceStudents } from '../selectors/attendanceSelectors';
import { selectAttendanceThreshold } from '../features/preferences/preferencesSlice';
import SummaryCard from '../components/common/SummaryCard';
import ChartCard from '../components/common/ChartCard';
import { formatPercentage } from '../utils/attendanceCalculations';

// Custom Tooltip component for Recharts
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '0.55rem 0.75rem',
          borderRadius: '7px',
          boxShadow: '0 6px 14px rgba(0, 0, 0, 0.18)',
          fontSize: '0.78rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: '0.15rem', color: '#94a3b8' }}>
          {label || data.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: data.fill || data.color }} />
          <span>{data.value}{typeof data.value === 'number' && data.name?.includes('Rate') ? '%' : ''}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const metrics = useAppSelector(selectDashboardMetrics);
  const statusData = useAppSelector(selectStatusDistributionData);
  const trendData = useAppSelector(selectAttendanceTrendData);
  const subjectData = useAppSelector(selectSubjectAttendanceData);
  const departmentData = useAppSelector(selectDepartmentAttendanceData);
  const recentSessions = useAppSelector(selectRecentSessionsFeed);
  const lowStudents = useAppSelector(selectLowAttendanceStudents);
  const threshold = useAppSelector(selectAttendanceThreshold);

  return (
    <div>
      {/* Header & Quick Actions */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Attendance Operations Hub
            </h2>
            <span
              className="badge badge-neutral"
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                color: 'var(--primary-700)',
                border: '1px solid rgba(99, 102, 241, 0.18)',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              Academic Term 2026-27
            </span>
          </div>
          <p className="page-subtitle">
            Executive academic attendance overview, status distributions, and compliance alerts.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.55rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/students')}
          >
            <UserPlus size={15} />
            <span>Manage Students</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/attendance')}
          >
            <CalendarCheck size={15} />
            <span>Record Session Attendance</span>
          </button>
        </div>
      </div>

      {/* Summary Cards Grid: Compact and Fresh */}
      <div className="metrics-grid">
        <SummaryCard
          label="Total Enrolled"
          value={metrics.totalStudents}
          subtext="Active student cohort"
          icon={Users}
          iconColor="#4f46e5"
          iconBg="#eef2ff"
          accentColor="#4f46e5"
        />

        <SummaryCard
          label="Total Present (P)"
          value={metrics.presentCount}
          subtext="Attendance credit"
          icon={UserCheck}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          badgeText="P"
          badgeType="present"
          accentColor="#10b981"
        />

        <SummaryCard
          label="Total Absent (A)"
          value={metrics.absentCount}
          subtext="Unexcused hours"
          icon={UserX}
          iconColor="#ef4444"
          iconBg="#fef2f2"
          badgeText="A"
          badgeType="absent"
          accentColor="#ef4444"
        />

        <SummaryCard
          label="Placement (PL)"
          value={metrics.internshipPlacedCount}
          subtext="Non-countable"
          icon={Briefcase}
          iconColor="#8b5cf6"
          iconBg="#f5f3ff"
          badgeText="PL"
          badgeType="placement"
          accentColor="#8b5cf6"
        />

        <SummaryCard
          label="Official Eng (E)"
          value={metrics.officialEngagementCount}
          subtext="Non-countable"
          icon={Award}
          iconColor="#f59e0b"
          iconBg="#fffbeb"
          badgeText="E"
          badgeType="engagement"
          accentColor="#f59e0b"
        />

        <SummaryCard
          label="Campus Average"
          value={formatPercentage(metrics.overallPercentage)}
          subtext="P / (P + A) ratio"
          icon={Percent}
          iconColor="#0284c7"
          iconBg="#f0f9ff"
          badgeText="Ratio"
          badgeType="neutral"
          accentColor="#0284c7"
        />

        <SummaryCard
          label="Under Floor"
          value={metrics.lowAttendanceCount}
          subtext={`< ${threshold}% minimum target`}
          icon={AlertTriangle}
          iconColor="#dc2626"
          iconBg="#fef2f2"
          badgeText="Alert"
          badgeType="danger"
          accentColor="#dc2626"
        />
      </div>

      {/* Low Attendance Warning Banner if any students below threshold */}
      {lowStudents.length > 0 && (
        <div
          style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            padding: '0.85rem 1.15rem',
            marginBottom: '1.45rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.85rem',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldAlert size={18} />
            </div>
            <div>
              <strong style={{ color: '#92400e', fontSize: '0.9rem' }}>
                Compliance Watchlist: {lowStudents.length} Student{lowStudents.length > 1 ? 's' : ''} Falling Below {threshold}% Required Attendance
              </strong>
              <p style={{ color: '#b45309', fontSize: '0.78rem', marginTop: '0.1rem' }}>
                Students below the threshold risk semester examination debarment pursuant to campus regulations.
              </p>
            </div>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            style={{ borderColor: '#fcd34d', color: '#92400e', backgroundColor: '#fff', fontWeight: 700 }}
            onClick={() => navigate('/reports')}
          >
            <span>Review In Audits</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Visual Analytics Grid: 4 Core Charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '1.15rem',
          marginBottom: '1.45rem',
        }}
      >
        {/* Chart 1: Status Distribution */}
        <ChartCard
          title="Attendance Status Distribution"
          subtitle="Proportion of Present, Absent, Placement, and Official Engagement marks"
          isEmpty={statusData.length === 0}
          minHeight={230}
        >
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
              >
                {statusData.map((entry) => (
                  <Cell key={entry.code} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomChartTooltip />} />
              <Legend verticalAlign="bottom" height={30} iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Attendance Trends Over Time */}
        <ChartCard
          title="Campus Attendance Rate Over Time"
          subtitle="Daily aggregated attendance percentage across recorded class sessions"
          isEmpty={trendData.length === 0}
          minHeight={230}
        >
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={trendData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={10} unit="%" />
              <Tooltip content={<CustomChartTooltip />} />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#4f46e5"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#trendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3: Subject-wise Comparison */}
        <ChartCard
          title="Curriculum Attendance Rate"
          subtitle="Aggregated percentage across registered curriculum course offerings"
          isEmpty={subjectData.length === 0}
          minHeight={230}
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={subjectData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="code" stroke="#94a3b8" fontSize={10} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={10} unit="%" />
              <Tooltip content={<CustomChartTooltip />} />
              <Bar dataKey="percentage" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 4: Department-wise Comparison */}
        <ChartCard
          title="Department-wise Attendance Overview"
          subtitle="Comparative student attendance standings grouped by academic department"
          isEmpty={departmentData.length === 0}
          minHeight={230}
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={departmentData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="department" stroke="#94a3b8" fontSize={9} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={10} unit="%" />
              <Tooltip content={<CustomChartTooltip />} />
              <Bar dataKey="percentage" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Two-Column Lower Section: Recent Sessions & Students Requiring Attention */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '1.15rem',
        }}
      >
        {/* Recent Attendance Activity Feed */}
        <div className="table-card" style={{ padding: '1.15rem', marginBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.85rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Recent Class Sessions
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--slate-400)' }}>Latest recorded classroom periods</p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/attendance')}
            >
              Take Attendance
            </button>
          </div>

          {recentSessions.length === 0 ? (
            <p style={{ color: 'var(--slate-500)', fontSize: '0.82rem' }}>No recent sessions recorded.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--slate-50)',
                    border: '1px solid var(--slate-200)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <strong style={{ color: 'var(--slate-900)', fontSize: '0.88rem' }}>
                        {session.subjectCode}
                      </strong>
                      <span className="badge badge-neutral" style={{ fontSize: '0.66rem' }}>
                        Sem {session.semester} • Sec {session.section}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)', marginTop: '0.15rem' }}>
                      {session.date} • {session.subjectName}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--slate-900)', fontSize: '0.92rem' }}>
                      {session.stats.present} / {session.stats.total} P
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--primary-600)', fontWeight: 600 }}>
                      {formatPercentage(session.stats.percentage)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Attendance Watchlist */}
        <div className="table-card" style={{ padding: '1.15rem', marginBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.85rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Watchlist: Under {threshold}% Floor
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--slate-400)' }}>Students needing academic intervention</p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/students')}
            >
              All Students
            </button>
          </div>

          {lowStudents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--status-p-text)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Exemplary Standing!</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
                All registered active students meet the {threshold}% minimum attendance target.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {lowStudents.slice(0, 5).map(({ student, stats }) => (
                <div
                  key={student.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#fff1f2',
                    border: '1px solid #fecdd3',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: '#9f1239', fontSize: '0.88rem' }}>
                      {student.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#be123c', marginTop: '0.1rem' }}>
                      {student.studentId} • {student.department} Sem {student.semester}-{student.section}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      className="badge badge-danger"
                      style={{ fontSize: '0.78rem', fontWeight: 800 }}
                    >
                      {formatPercentage(stats.percentage)}
                    </span>
                    <div style={{ fontSize: '0.68rem', color: '#9f1239', marginTop: '0.15rem' }}>
                      {stats.present} P of {stats.countable} Countable
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
