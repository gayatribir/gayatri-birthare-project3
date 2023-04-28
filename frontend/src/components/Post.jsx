import { Link } from "react-router-dom";
import Avatar from './Avatar';
import moment from "moment/moment";
import PostActions from "./PostActions";
import { useContext } from "react";
import { AppContext } from "../context";


function Post({postUserName, updatedAt, content, tweetId}) {
  const {userName} = useContext(AppContext)
  const isLoggedIn = userName == "" ? false: true;

  return (
    <div className="post-border-div">
      <div className="post">
        <Avatar userName={postUserName.charAt(0)} />
        <div className="post-div">
          <div className="post-header">
            <span className="post-user"><Link to={'/user/' + postUserName} className="post-username">@{postUserName}</Link></span>
            <span className="post-user post-time">{moment.utc(updatedAt).local().startOf('seconds').fromNow()}</span>
            <div className="hide">{updatedAt.substring(0,10)+" "+updatedAt.substring(11,16)}</div>
          </div>
        </div>
        {isLoggedIn == true && postUserName === userName ? <div className="posts-actions-div"><PostActions tweetId={tweetId}></PostActions></div> : "" }
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
  }

export default Post;