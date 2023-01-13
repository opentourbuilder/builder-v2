import { FaPlus } from "react-icons/fa";
import styles from "styles/tour-editor/AddPointButton.module.css";

export default function AddPointButton({ addWaypoint, addControlPoint }: {
  addWaypoint?: (() => void) | undefined,
  addControlPoint?: (() => void) | undefined
}) {
  if (addWaypoint && addControlPoint) {
    return (
      <div className={styles.AddPointButton}>
        <div className={styles.buttonContainer}>
          <button className="primary" onClick={addWaypoint}>Add Waypoint</button>
        </div>
        <div className={styles.icon}><FaPlus /></div>
        <div className={styles.buttonContainer}>
          <button className="primary" onClick={addControlPoint}>Add Control Point</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.AddPointButton}>
        <div className={styles.buttonContainer} style={{ flex: "unset", transformOrigin: "center" }}>
          <button className="primary" onClick={addWaypoint || addControlPoint}>{addWaypoint ? "Add Waypoint" : "Add Control Point"}</button>
        </div>
      </div>
    );
  }
}