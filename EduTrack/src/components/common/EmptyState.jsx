import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'Try adjusting your filters or search terms to find what you are looking for.',
  action,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      <h4 className="empty-state-title">{title}</h4>
      <p className="empty-state-text">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;

