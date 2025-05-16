import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { API_URL } from "../config";
import { updateUserVisited } from "../redux/auth/authActions";

const VisitatoButton = ({ bivaccoId, onStatusChange }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);

  // Disable button if not logged in
  if (!user) {
    return <button disabled className="btn btn-outline-secondary">Visitato</button>;
  }

  const isVisited = user.visited.includes(bivaccoId);

  const toggleVisited = async () => {
    setUpdating(true);

    // Update local array
    const updatedVisited = isVisited
      ? user.visited.filter((id) => id !== bivaccoId)
      : [...user.visited, bivaccoId];

    try {
      // Update backend
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visited: updatedVisited }),
      });

      if (!response.ok) throw new Error("Failed to update visited");

      // Update Redux
      dispatch(updateUserVisited(updatedVisited));

      // Optional callback for parent
      if (onStatusChange) onStatusChange(updatedVisited);
    } catch (err) {
      console.error("Error updating visited:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <button
      className={isVisited ? "btn btn-success" : "btn btn-outline-secondary"}
      onClick={toggleVisited}
      disabled={updating}
    >
      {isVisited ? "Visitato ✓" : "Visitato"}
    </button>
  );
};

export default VisitatoButton;
