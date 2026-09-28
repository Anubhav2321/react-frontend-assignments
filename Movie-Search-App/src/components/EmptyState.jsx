import { Link } from 'react-router-dom';

export default function EmptyState({ title, message, actionText, actionLink, onActionClick }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      
      {actionLink ? (
        <Link to={actionLink} className="btn-primary">
          {actionText}
        </Link>
      ) : actionText ? (
        <button className="btn-primary" onClick={onActionClick}>
          {actionText}
        </button>
      ) : null}
    </div>
  );
}
