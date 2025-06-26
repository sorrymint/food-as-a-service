export const db = {
  users: [] as { id: number; email: string; passwordHash: string; name: string | null; role: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null; }[],
  // ... other tables here

  _ids: { users: 1, /* ... */ },

  insert(table, values) {
    // create in-memory row
  },

  select(table) {
    return [...this[table]];
  },

  update(table, filterFn, updateFn) {
    // update matching records
  },

  delete(table, filterFn) {
    // delete matching records
  }
};
