export const validateName = (field, name) => {
  if (!name.trim()) {
    return `${field} is required`;
  }
  if (name.length < 2) {
    return `${field} must be at least 2 characters`;
  }
  if (!/^[a-zA-Z0-9\s,'-]*$/.test(name)) {
    return `${field} contains invalid characters`;
  }
  return null;
};
