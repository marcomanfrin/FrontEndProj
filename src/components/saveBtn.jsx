import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { API_URL } from "../config";
import { updateUserSaved } from "../redux/auth/authActions";

const SaveButton = ({ bivaccoId, onStatusChange }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);

  // Disable button if not logged in
  if (!user) {
    return <button disabled className="btn btn-outline-secondary">Visitato</button>;
  }

  const isSaved = user.saved.includes(bivaccoId);

  const toggleSaved = async () => {
    setUpdating(true);

    // Update local array
    const updatedSaved = isSaved
      ? user.saved.filter((id) => id !== bivaccoId)
      : [...user.saved, bivaccoId];

    try {
      // Update backend
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saved: updatedSaved }),
      });

      if (!response.ok) throw new Error("Failed to update to-do");

      // Update Redux
      dispatch(updateUserSaved(updatedSaved));

      // Optional callback for parent
      if (onStatusChange) onStatusChange(updatedSaved );
    } catch (err) {
      console.error("Error updating to-do:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <button
      className={isSaved ? "btn btn-success" : "btn btn-outline-secondary"}
      onClick={toggleSaved}
      disabled={updating}
    >
      {isSaved ? "To-do ✓" : "to-do"}
    </button>
  );
};

export default SaveButton;
