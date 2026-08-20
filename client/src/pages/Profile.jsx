function Profile({ user, goBack }) {
  return (
    <div className="profile-container">

      <div className="profile-box">

        <h1>👤 My Profile</h1>

        <div className="profile-info">

          <div className="profile-field">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-field">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-field">
            <span>Account</span>
            <strong>Active ✅</strong>
          </div>

        </div>

        <button
          className="back-button"
          onClick={goBack}
        >
          ← Back to Tasks
        </button>

      </div>

    </div>
  );
}

export default Profile;