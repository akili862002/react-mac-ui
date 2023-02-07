export const useResponsive = () => {
  const downPhone = window.innerWidth <= 600;
  return { downPhone };
};
