import React from "react";
import PropTypes from "prop-types";
import styles from "./YoutubeEmbed.module.css";

const YoutubeEmbed = ({ embedId }) => (
  
    <iframe
      width="100%"
      
      
      src={`https://www.youtube.com/embed/${embedId}?start=20&autoplay=1&mute=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
     
    />

    
  
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;