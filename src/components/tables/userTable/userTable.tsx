import UseCustomData from "../../../hooks/useCustomData";

const UserTable = () => {
  const { users } = UseCustomData();

  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {users && users.length > 0 ? (
          users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.address.suite}, {user.address.street},{" "}
                {user.address.zipcode}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="no-data">No User data....</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
