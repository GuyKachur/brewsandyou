import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

//https://en.wikipedia.org/wiki/File:Stone_Brewing_Co._Year_Round_Beers.jpg

const items = [
  {
    src:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Stone_Brewing_Co._Year_Round_Beers.jpg/800px-Stone_Brewing_Co._Year_Round_Beers.jpg",
    altText: "Stone Brewing",
    caption: "A beer on a bar"
  },
  {
    //https://commons.wikimedia.org/wiki/File:Green_Beacon_Brewing_Company_08.jpg
    src:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Green_Beacon_Brewing_Company_08.jpg/799px-Green_Beacon_Brewing_Company_08.jpg",
    altText: "A flight of beers",
    caption: "A flight of beers"
  },
  {
    //https://www.pexels.com/photo/three-10-barrel-brewing-glasses-full-of-beer-1267681/
    src:
      "https://images.pexels.com/photos/1267681/pexels-photo-1267681.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    altText: "A flight of beers",
    caption: "A flight of beers"
  }
];

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  testFunc(){
    this.props.history.replace("/search");
  }

  render() {
    // console.log("LandingPage props: ", this.props);

    const { activeIndex } = this.state;
    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <div>
        <h1>Welcome!</h1>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        <div>
          <p>This is where a blurb should go</p>{" "}
        </div>
        <div>
          <button onClick={this.testFunc.bind(this)}>Search for Beer!</button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
