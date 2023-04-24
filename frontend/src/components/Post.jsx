import { Link } from "react-router-dom";
import Avatar from './Avatar';
import moment from "moment/moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


function Post({userName, updatedAt, content}) {
  
  console.log(userName);

  return (
    <div className="post-border-div">
      <div className="post">
        <Avatar userName={userName.charAt(0)} />
        <div className="post-div">
          <div className="post-header">
            <span className="post-user"><Link to={'/user/' + userName} className="post-username">@{userName}</Link></span>
            <span className="post-user post-time">{moment.utc(updatedAt).local().startOf('seconds').fromNow()}</span>
            <div className="hide">{updatedAt.substring(0,10)+" "+updatedAt.substring(11,16)}</div>
          </div>
        </div>
      <div className="posts-actions-div"><button className="actions-button" >...</button></div>
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
  }

export default Post;