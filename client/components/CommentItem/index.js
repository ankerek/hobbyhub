import React, { PropTypes as T } from 'react';
import { FormattedTime } from 'react-intl';
import { connect } from 'react-redux';
import { isAuthenticated } from '../../reducers/auth';

import { Button, Glyphicon } from 'react-bootstrap';
import CommentForm from '../CommentForm';
import UserAvatar from '../UserAvatar';
import { bm, be } from '../../utils/bem';

import './index.scss';

export const mapStateToProps = (state) => {
  return ({
    isAuthenticated: isAuthenticated(state),
  })
};

export const mapDispatchToProps = {
};

export class EventItemContainer extends React.Component {
  state = {
    reply: false,
  }

  toggleReply = () => {
    this.setState(({ reply }) => ({
      reply: !reply,
    }))
  }

  handleReply = ({ text }) => {
    console.log(this.props)
    this.props.onSubmit({ text, commentId: this.props.comment._id });
  }

  render() {
    return renderCommentItem({...this.props, toggleReply: this.toggleReply, onSubmit: this.handleReply, replying: this.state.reply});
  }
}

export const renderCommentItem = ({
  moduleName = 'CommentItem',
  modifiers = '',
  comment,
  replying,
  isReply = false,
  isAuthenticated,
  toggleReply,
  onSubmit,
}) => (
  <div className={bm(moduleName, modifiers)}>
    <div className={bm('Grid', '1col multiCol:60em fit:60em gutterA20px')}>
      <div className={`${be('Grid', 'cell')}`}>
        <div className="u-spacing10px">
          {user.author}
        </div>
      </div>
      <div className={`${be('Grid', 'cell')} u-flexOne`}>
        <p className="u-spacing5px">
          <strong>
            <FormattedTime day="numeric" month="long" year="numeric" time="long" value={comment.timestamp} />
          </strong>
        </p>
        <p className="u-spacing5px">
          {comment.text}
        </p>
        { comment.replies && comment.replies.map((comment) => renderCommentItem({comment, isReply: true})) }
        { !isReply && isAuthenticated && (replying 
            ? <CommentForm onSubmit={onSubmit} form={comment._id} />
            : <Button bsStyle="primary" bsSize="sm" onClick={toggleReply} style={{width: 100}}>Reply</Button>
         )}
        
      </div>
    </div>
  </div>
);

renderCommentItem.propTypes = {
  comment: T.object.isRequired,
};

const CommentItem = connect(mapStateToProps, mapDispatchToProps)(EventItemContainer);

export default CommentItem;
