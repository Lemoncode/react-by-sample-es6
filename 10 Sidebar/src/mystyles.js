export function calculateDivWidth(isVisible) {
  const widthpx = isVisible ? '250px' : '0';
  const style = { width: widthpx };

  return style;
}
