const Notification = ({ content, type }) => {
  if (!content) return null;

  return <div className={`toast ${type}`}>{content}</div>;
};

export default Notification;
