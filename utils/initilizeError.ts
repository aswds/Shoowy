export const initializeError = (
  isLoadingSetter,
  isModalVisibleSetter,
  errorSetter,
  errorMessage
) => {
  // Set isLoading to false
  isLoadingSetter(false);

  // Show modal (if needed)
  isModalVisibleSetter(true);

  // Set error message
  errorSetter(errorMessage);
};
