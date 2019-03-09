import React from "react";

function ArtistImage(props) {
    return (
        // using the props, display this image in a nice responsive div
        <div className="col s6 m3">
            <img className="circle" 
            src={props.photo.url} 
            alt={props.photo.name}
            // use this photo's id to pass back to the parent as an argument for the handleOnClick method
            onClick={()=>props.onClick(props.photo.id)}
            ></img>
        </div>
    );
}

export default ArtistImage;