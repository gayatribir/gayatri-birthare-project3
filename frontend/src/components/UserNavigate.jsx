import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function UserNavigate({userName}) {
  return (
    <Dropdown>
    <Dropdown.Toggle variant="primary" id="dropdown-basic" className='navigate-user-ddl'>
      {userName}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href={"/user/"+userName}>View Profile</Dropdown.Item>
      <Dropdown.Item href="/signout">SignOut</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}

export default UserNavigate;