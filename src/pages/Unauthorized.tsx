import { Link } from 'react-router';

const Unauthorized = () => {
  return (
    <div>
      <h1>You are not authorized</h1>
      <Link to='/'>Go to Home</Link>
    </div>
  );
};

export default Unauthorized;
