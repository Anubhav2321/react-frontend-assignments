import React from 'react';

export const SummaryCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor = '#4f46e5',
  iconBg = '#eef2ff',
  badgeText,
  badgeType = 'neutral',
  accentColor,
}) => {
  return (
    <div
      className="metric-card"
      style={
        accentColor
          ? {
              borderTop: `3px solid ${accentColor}`,
            }
          : {}
      }
    >
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        {Icon && (
          <div
            className="metric-icon-box"
            style={{
              backgroundColor: iconBg,
              color: iconColor,
            }}
          >
            <Icon size={16} strokeWidth={2.4} />
          </div>
        )}
      </div>
      <div>
        <div className="metric-value">{value}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.35rem',
          }}
        >
          {subtext && <span className="metric-subtext">{subtext}</span>}
          {badgeText && (
            <span
              className={`badge badge-${badgeType}`}
              style={{ fontSize: '0.68rem', padding: '0.12rem 0.5rem' }}
            >
              {badgeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
