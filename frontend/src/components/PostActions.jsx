import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate, Link} from "react-router-dom"

function PostActions({tweetId}) {
  const navigate = useNavigate();
  return (
    <Dropdown>
    <Dropdown.Toggle variant="info" id="dropdown-basic" size="sm" className='post-ddl'>
      ...
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href={"/edit/"+tweetId}>Edit</Dropdown.Item>
      <Dropdown.Item href={"/delete/"+tweetId}>Delete</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}

export default PostActions;