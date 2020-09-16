// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const {currentUser} = initialState || {};

  function checkRole(role: any = []) {
    return role.some((r: any) => currentUser && currentUser.access?.includes(r))
  }

  return {
    admin: checkRole(['admin']),
    carManager: checkRole(['trans', 'admin']),
    transManager: checkRole(['trans', 'admin']),
    orderManager: checkRole(['trans', 'admin', 'trans', 'cargo'])
  };
}

