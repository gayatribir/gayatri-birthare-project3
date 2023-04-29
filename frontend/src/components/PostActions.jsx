import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate, Link} from "react-router-dom"
import {toast } from 'react-toastify';

function PostActions({tweetId}) {
  const navigate = useNavigate();
  // const [isEdit, setIsEdit] = useState(false);

  // const editPost =()=> {setIsEdit(!isEdit);}

  async function deletePost(){
    const request = await axios.delete(`/api/tweet/`+tweetId);

    if(request.status === 200) {
      navigate(0);
      toast.success("You have deleted the post successfully.");
    } else {
      console.log("error while deleting");
      toast.error("Error occurred while deleting. Please try again.");
      return;
    }
  }

  return (
    <Dropdown>
    <Dropdown.Toggle variant="info" id="dropdown-basic" size="sm" className='post-ddl'>
      ...
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href={"/edit/"+tweetId} >Edit</Dropdown.Item>
      <Dropdown.Item onClick={deletePost}>Delete</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}

export default PostActions;