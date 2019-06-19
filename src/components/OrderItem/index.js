import React, { Component } from "react";
import "./style.css";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      stars: props.data.stars || 0,
      comment: props.data.comment || ""
    };
  }

  render() {
    const { shop, product, price, picture, ifCommented } = this.props.data;
    return (
      <div className="orderItem">
        <div className="orderItem__picContainer">
          <img className="orderItem__pic" src={picture} alt="商品图片" />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="orderItem__shop">{shop}</div>
          <div className="orderItem__detail">
            <div className="orderItem__price">{price}</div>
            <div>
              {ifCommented ? (
                <botton className="orderItem__btn orderItem__btn--grey">
                  已评价
                </botton>
              ) : (
                <botton
                  className="orderItem__btn orderItem__btn--red"
                  onClick={this.handleOpenEditArea}
                >
                  评价
                </botton>
              )}
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    );
  }

  renderEditArea() {
    return (
      <div className="orederItem__commentContainer">
        <textarea
          onChange={this.handleCommentChange}
          value={this.state.comment}
          className="orederItem__comment"
        />
        {this.renderStars()}
        <botton
          className="orderItem__btn orderItem__btn--red"
          onClick={this.handleSubmitComment}
        >
          提交
        </botton>
        <botton
          className="orderItem__btn orderItem__btn--grey"
          onClick={this.handleCancelComment}
        >
          取消
        </botton>
      </div>
    );
  }

  renderStars() {
    const { stars } = this.state;
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = stars >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}
              key={index}
              onClick={this.handleClickStars.bind(this, item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }

  handleOpenEditArea = () => {
    this.setState({
      editing: true
    });
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleClickStars = stars => {
    this.setState({
      stars: stars
    });
  };

  handleCancelComment = () => {
    this.setState({
      editing: false,
      stars: this.props.data.stars || 0,
      comment: this.props.data.comment || ""
    });
  };

  handleSubmitComment = () => {
    const { id } = this.props.data;
    const { comment, stars } = this.state;
    this.setState({
      editing: false
    });
    this.props.onSubmit(id, comment, stars);
  };
}

export default OrderItem;
