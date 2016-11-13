export const NAVIGATE = 'NAVIGATE';
export const navigate = ({ location, pathname, action = 'PUSH' }) => {
  let newLocation = location;

  if (!newLocation) {
    newLocation = { pathname };
  }

  return ({
    type: NAVIGATE,
    payload: {
      location: newLocation,
      action,
    },
  });
};
