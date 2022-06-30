const UsersData = (props) => {
  const showAdminAlert = async () => {
    // alert("I am an admin!");
    const settings ={
        // headers: {
        //     "Authorization": "Bearer " + props.token
        // }
        credentials:"include"
    }

    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/admin/${props.currentUserId}/count`, settings);

    const parsedRes = await response.json();
    try {
      if (response.ok) {
        alert(`Current number of users ${parsedRes.count}`);
      } else {
        throw new Error(parsedRes.message);
      }
    } catch {
      alert(parsedRes.message);
    }
  };

  return (
    <button className="logout-btn" onClick={showAdminAlert}>
      View Users Data
    </button>
  );
};

export default UsersData;
