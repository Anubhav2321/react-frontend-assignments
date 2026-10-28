import React from 'react';
import { STATUS_CONFIG } from '../../utils/attendanceCalculations';

export const StatusBadge = ({ status, showCode = true, showLabel = true, className = '' }) => {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return (
      <span className={`badge badge-neutral ${className}`}>
        <span className="status-dot" style={{ backgroundColor: 'var(--slate-400)' }} />
        <span>{status || 'Unknown'}</span>
      </span>
    );
  }

  return (
    <span className={`badge ${config.badgeClass} ${className}`} title={config.description}>
      <span className="status-dot" />
      {showCode && <strong>{config.code}</strong>}
      {showCode && showLabel && <span>•</span>}
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

export default StatusBadge;
