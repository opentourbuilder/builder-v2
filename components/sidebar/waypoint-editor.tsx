import { ChangeEvent, useId, useState } from "react";
import { SetterOrUpdater } from "recoil";

import clsx from "clsx";
import { FaChevronUp, FaTrash } from "react-icons/fa";

import { WaypointModel } from "../../src/data";
import { callIfUpdater } from "../../src/state";

import AssetChooser from "../asset-chooser";
import GalleryEditor from "../gallery-editor";
import LocationChooser from "../location-chooser";

import styles from "../../styles/WaypointEditor.module.css";

export default function WaypointEditor({ waypoint, setWaypoint, remove }: {
  waypoint: WaypointModel,
  setWaypoint: SetterOrUpdater<WaypointModel>,
  remove: () => void,
}) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);

  function handleExpandCollapseClick() {
    setExpanded(expanded => !expanded);
  }

  function handleTitleChange(ev: ChangeEvent<HTMLInputElement>) {
    setWaypoint(waypoint => ({ ...waypoint, name: ev.target.value }));
  }

  function handleDescChange(ev: ChangeEvent<HTMLTextAreaElement>) {
    setWaypoint(waypoint => ({ ...waypoint, desc: ev.target.value }));
  }

  function handleLocationChange(lat: number, lng: number) {
    setWaypoint(waypoint => ({ ...waypoint, lat, lng }));
  }

  function handleTranscriptChange(ev: ChangeEvent<HTMLTextAreaElement>) {
    setWaypoint(waypoint => ({ ...waypoint, transcript: ev.target.value }));
  }

  function handleNarrationChange(narration: string) {
    setWaypoint(waypoint => ({ ...waypoint, narration: narration.trim() === "" ? null : narration.trim() }));
  }

  return (
    <div className={`${styles.Waypoint} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.waypointCardHeader}>
        <input
          type="text"
          name="Waypoint Title"
          placeholder="Waypoint Title"
          defaultValue={waypoint.name}
          className={styles.waypointTitle}
          id={`${id}-title`}
          onChange={handleTitleChange}
        />
        <div style={{flex:1}}></div>
        <button className={styles.waypointButton} onClick={remove}>
          <FaTrash />
        </button>
        <button className={clsx([styles.waypointButton, styles.waypointExpandCollapseButton])} onClick={handleExpandCollapseClick}>
          <FaChevronUp />
        </button>
      </div>
      <section className={styles.waypointExtraContent}>
        <div className="column">
          <label htmlFor={`${id}-desc`} className="inline-label">Description</label>
          <textarea
            name="Waypoint Description"
            id={`${id}-desc`}
            onChange={handleDescChange}
          />
        </div>
        <LocationChooser lat={waypoint.lat} lng={waypoint.lng} onChange={handleLocationChange} />
        <GalleryEditor
          gallery={waypoint.gallery}
          setGallery={newWaypoint => setWaypoint(waypoint => ({
            ...waypoint,
            gallery: callIfUpdater(waypoint.gallery, newWaypoint)
          }))}
        />
        <AssetChooser name="Narration" kind="narration" onChange={handleNarrationChange} />
        <div className="column"> 
          <label htmlFor={`${id}-transcript`} className="inline-label">Transcript</label>
          <textarea
            name="Narration Transcript"
            id={`${id}-transcript`}
            onChange={handleTranscriptChange}
          />
        </div>
      </section>
    </div>
  );
}
