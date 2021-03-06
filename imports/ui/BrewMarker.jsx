import React, { Component } from "react";
import { Marker } from "react-google-maps";
import PropTypes from "prop-types";

// import BeerIcon from "public/favicon.ico";

class BrewMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeMarker: this.props.activeMarker
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    //new logic should be to highlight in the list which brewery has been selected
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (!this.state.isOpen) {
        this.setState({ activeMarker: false }, () => {
          this.props.closeMarkers(null);
        });
      } else {
        this.props.closeMarkers(this.props.id);
      }
    });
  }

  componenetDidUpdate(nextProps) {
    //also old logic
    this.setState({ activeMarker: nextProps.activeMarker });
  }

  render() {
    //  console.log("BREWMARKERPROPS", this.props);
    return (
      <div>
        <Marker
          title={this.props.name}
          onClick={e => this.props.onMarkerClick(this.props.brewery, e)}
          position={this.props.location}
          zIndex={this.props.activeMarker ? 20 : 0}
          icon={
            this.props.activeMarker
              ? "marker-75.png"
              : "slightlybigger@0.6x.png"
          }
        />
      </div>
    );
  }
}

BrewMarker.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  website_url: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  brewery: PropTypes.object.isRequired,
  closeMarkers: PropTypes.func,
  onMarkerClick: PropTypes.func,
  activeMarker: PropTypes.bool
};

export default BrewMarker;
