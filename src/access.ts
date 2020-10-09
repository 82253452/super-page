// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const {currentUser} = initialState || {};

  function checkRole(role: any = []) {
    return role.some((r: any) => currentUser && (currentUser.access?.includes(r) || currentUser.access?.includes('admin')))
  }

  return {
    admin: checkRole(['admin']),
    carManager: checkRole(['admin']),
    transManager: checkRole(['trans']),
    orderManager: checkRole(['trans', 'company', 'cargo'])
  };
}


