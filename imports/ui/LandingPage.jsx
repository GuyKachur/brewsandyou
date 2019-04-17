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
  // {
  //   src:
  //     "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Stone_Brewing_Co._Year_Round_Beers.jpg/800px-Stone_Brewing_Co._Year_Round_Beers.jpg",
  //   altText: "Stone Brewing",
  //   caption: "A beer on a bar"
  // },
  {
    //https://www.pexels.com/photo/three-10-barrel-brewing-glasses-full-of-beer-1267681/
    src:
      "https://images.pexels.com/photos/1267681/pexels-photo-1267681.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    altText:
      "the beutiful sunlight filtering through three beers, one a bright yellow, one a warm rich orange, and the last a vibrant alive red.",
    caption: "One Beer, Two Beer, Three Beer, Pour!"
  },
  {
    //https://commons.wikimedia.org/wiki/File:Green_Beacon_Brewing_Company_08.jpg
    src:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Green_Beacon_Brewing_Company_08.jpg/799px-Green_Beacon_Brewing_Company_08.jpg",
    altText:
      "A series of large brewering barrels aligned, clean and ready to be filled with that sweet sweet necter",
    caption: "Metal boys in a line"
  },
  {
    //https://www.vineyardsquarehotel.com/wp-content/uploads/2018/09/marthas-vineyard-craft-beer-festival-1024x576.jpg
    src:
      "https://www.vineyardsquarehotel.com/wp-content/uploads/2018/09/marthas-vineyard-craft-beer-festival-1024x576.jpg",
    altText: "A flight of beers, each more beer then the last",
    caption: "Which one is the true Beer?"
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

  redirectSearch() {
    return this.props.history.push("/search");
  }

  render() {
    // console.log("LandingPage props: ", this.props);

    const { activeIndex } = this.state;
    const slides = items.map(item => {
      return (
        <CarouselItem
          className="custom-carousel"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} />
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
        <div className="p-2">
          <p>This is a place to find and discuss your favorite breweries</p>{" "}
        </div>
        <div className="col">
          <button
            onClick={this.redirectSearch.bind(this)}
            className="button--primary"
          >
            Start search!
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
