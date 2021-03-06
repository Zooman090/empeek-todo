import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';

import { addNewItem, changeActiveItem } from '../../actions/item';
import { commentTemplate } from '../../actions/comment';

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.addNewItem = this.addNewItem.bind(this);
  }

  addNewItem(event) {
    event.preventDefault();

    const { addNewItem, itemsList, createTemplateForComment } = this.props,
      indexOfLastItem = itemsList.length ? itemsList.length - 1 : 0,
      lastItem = itemsList[indexOfLastItem],
      { id = 0 } = lastItem || {},
      newId = id + 1,
      { title } = this.state;

    addNewItem({ title, id: newId });
    createTemplateForComment(newId);

    this.setState({ title: '' });
  }

  render() {
    const { title } = this.state;

    return (
      <form id="add-item-form" onSubmit={this.addNewItem} className="add-item-container col">
        <Input className="add-item-container__text-filed" placeholder="Type name here..."
          required={true}
          value={title}
          onChange={event => this.setState({ title: event.target.value })}/>
        <Button className="add-item-container__add-btn" color="primary" type="submit">Add New</Button>
      </form>
    );
  }
}

const mapState = ({ itemsList }) => ({ itemsList }),
  mapDispatch = dispatch => ({
    addNewItem: title => {
      dispatch(addNewItem(title));
    },
    createTemplateForComment: id => {
      dispatch(commentTemplate(id));
      dispatch(changeActiveItem(id));
    }
  });

export default connect(mapState, mapDispatch)(AddItem);
