
function Avatar({userName}) {
  // const [name, setName] = useState(userName)

  console.log("Avatar ",userName);

  return(
    <div className="avatar">{userName}</div>
    
  )
}

export default Avatar