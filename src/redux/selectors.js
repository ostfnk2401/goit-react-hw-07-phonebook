export const selectContacts = state => state.contacts.items;

export const selectFilter = state => state.filter.value;

export const selectLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;
